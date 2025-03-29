---
sidebar_label : jwt authentication in spring boot
description :  jwt authentication in spring boot ( without using spring security ) 
---

# jwt authentication in spring boot ( without using spring security ) 

---

Read Full Documentation of jjwt - ( java jwt ) page : to know internals and some interesting concepts : 
[ [https://github.com/jwtk/jjwt?tab=readme-ov-file](https://github.com/jwtk/jjwt?tab=readme-ov-file) ] 
## step1 : Add dependency to your pom.xml file
```Xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.6</version>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId> <!-- or jjwt-gson if Gson is preferred -->
    <version>0.12.6</version>
    <scope>runtime</scope>
</dependency>
```
## Step 2 : Create JWT utility class 
This class will handle the creation and validation of JWT tokens.
```Java
package com.grvbng7.safalvyapar.utils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.grvbng7.safalvyapar.entities.User;
	
@Component
public class JwtUtil {
    @Autowired
    SecretKey secretKey ;
	
    public String generateToken(User user) {
        return Jwts.builder()
        	.subject(user.getUsername())
        	.claim( "role" , user.getRole())
        	.claim("authorities", user.getAuthorities())
        	.signWith(secretKey)
            .compact();
    }
    
    
    // method to extract claims from JWT token
    public Claims extractClaims(String token) {    	
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token) 
            .getPayload() ; 
    }

}
```
write a factory method to get a signing key.
```
package com.grvbng7.safalvyapar.utils;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.MacAlgorithm;

import java.nio.charset.StandardCharsets;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;



@Configuration
public class FactoryMethodsConfigs {
	
	@Value("${gb.jwtkey}") //gb.jwtkey  is written inside application.properties file
	String secretKeyString ;
	
	@Bean
	public SecretKey getSecretKey() {
		byte[] keyBytes = secretKeyString.getBytes(StandardCharsets.UTF_8);
		return Keys.hmacShaKeyFor(keyBytes) ;  
	}


}

```
## Step 3 : add JWT filter :
our JwtFilter will extract the JWT token from the request and verify it manually without Spring Security.
```
package com.grvbng7.safalvyapar.utils;

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import com.grvbng7.safalvyapar.enums.UserRoles;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtil jwtUtil;
	@Value("${server.servlet.context-path}")
	private String contextPath;
	@Value("${gb.allowed.orginis}")
	private String allowedOrigin ; 
	@Autowired
	@Qualifier("handlerExceptionResolver")
	private HandlerExceptionResolver resolver;
	
	
	
	private static List<String> methodsToBefiltered  ;
	
	static { 
		methodsToBefiltered =  Stream.of( "GET" , "POST" , "PUT" , "DELETE").toList() ; 
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
			String token = request.getHeader("Authorization") ;	
			try {
				Claims claims = jwtUtil.extractClaims(token) ;  
				UserRoles role = UserRoles.valueOf((String)claims.get("role")) ; 
				switch (role) {
				case ADMIN:
					filterChain.doFilter(request, response);
					break ; 
				case USER : 
					//authorities validation logic
					response.sendError( 403  , "not authorized" ) ;
				}
			}catch(Exception c){
				c.printStackTrace();
		        response.setHeader("Access-Control-Allow-Origin", allowedOrigin);
		        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		        response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		        //if you dont set these above headers , 
		        //spring boots exceptionResolver will set it to none , 
		        //and you will be facing cors error in front end browser
		        //so in such cases then you will not be able to use 
		        //response entity you sent from global exception handler
				resolver.resolveException(request, response, null , new CustomException("invalid json token Please logout and re-login ", HttpStatus.FORBIDDEN) ) ; 
				//if you don't write this above line , 
				//no matter what you send using 
				//response.sendError() it will not be sent to front end correctly 
				//because by default these exceptions 
				//are handled by spring's  default exception resolver
				//now above line will tell resolver to see if there is any exception handler written for this 
				//i wrote it inside global exception handler.
				//Remember : your global exception handler is capable of handling exceptions upto controller layer 
				//it can not handle exceptions in your filters.
				//therefore we manually redirected our catched exception from our jwtFIlter to spring's exceptionHadler using exception respolver 
			
			}
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {		
		boolean case1 , case2  ;
		case1 = request.getRequestURI().equals(contextPath + "/login") ;
		case2 = ! methodsToBefiltered.contains(request.getMethod()) ; 
		//if you dont skip methods other than get , post , put ,delete
		//your preflight requests which may not containing authorization token get failed 
		//and your code will not work in browser.
		return (case1 || case2 ) ;
	}

}

```
## Step 4 : create LoginController to generate jwt token
Create a controller to authenticate the user (e.g., username and password) and issue the JWT token to user, now on each request user will send this token in authorization header.
