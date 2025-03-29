---
description : how to implement scheduled method execution in spring boot
---

# Scheduled Method Execution in Spring Boot

## 1. Enable Scheduling in your Spring Boot application
First, you need to enable scheduling in your application by adding the `@EnableScheduling` annotation to your main application class or any configuration class.
```Java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling  // Enable scheduling in Spring Boot
public class MyApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyApplication.class, args);
    }
}
```
## 2. Define the scheduled method
Now, create a service or any class where you want to define the scheduled method. Use the `@Scheduled` annotation to specify the interval for executing the method. You can use cron expressions, fixed rate, or fixed delay.
For your requirement of running the method every 6 hours, you can use `@Scheduled(fixedRate = ...)` to define a fixed time interval.
Here's an example of a service that runs every 6 hours
```Java
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class MyScheduledService {

    // This will run every 6 hours (21600000 milliseconds)
    @Scheduled(fixedRate = 21600000)
    public void runEverySixHours() {
        // Your method logic goes here
        System.out.println("Scheduled task executed at: " + System.currentTimeMillis());
    }
}
```
Alternatively, you can use a cron expression to achieve the same effect:
```Java
@Scheduled(cron = "0 0 */6 * * *")
public void runEverySixHoursWithCron() {
    // Your method logic goes here
    System.out.println("Scheduled task executed at: " + System.currentTimeMillis());
}
```

