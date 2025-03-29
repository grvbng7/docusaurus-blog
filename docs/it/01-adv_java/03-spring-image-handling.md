# Image Handling in Spring 
We can send file ( image , pdf or any kind of file ) and form data ( of type json )( first name , last name etc ) in same request using a multipart request from front end.
While doing this : only the trick is : json data must be converted to blob first and its content type should be set to application/json.
[ multipart request has multiple parts each with different content type , if you do not set content-type of your json data then you will face problems while parsing data on spring boot backend ]  

---
## Frontend  
 To send such data we use FormData object on front end.
```Javascript
//while using multipart file 
//we must send our json ( if any ) as a blob 
//this utility function will do this job
//it will also set content type of converted json as 'application/json'
//so that our spring boot's HttpMessageConvertor can proess it.
function jsonToBlobConverter(myjson){
    var stringJson = JSON.stringify(myjson);
    return new Blob([stringJson], {type: 'application/json'}) ; 
}
```
```Javascript
  var onChangeHandler = (element) => {
    var key = element.target.id;
    if (key === "image") {
      personDetails.image = element.target.files[0];
    }
    else{
      personDetails[key] = element.target.value;
    }
    setPersonDetails({ ...personDetails });
  };
```
```Javascript
      var formData = new FormData();
      var jsonData = { name : "gaurav" , email : "grvbng7@gmail.com" } ; 
      formData.append("jsonData", jsonToBlobConverter(jsonData) );
      formData.append("image", image );
      axios
        .post(`${apiBase}${apis.addPerson}`, formData )
        .then((response) => {
          console.log(response);
          toast(response.data);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error occured") ; 
        });
```
## Backend
```Java
    @PostMapping(consumes = { MediaType.ALL_VALUE })
    public ResponseEntity<String> addPerson(@RequestPart(name = "image", required = false) MultipartFile image,
                    @RequestPart(name = "jsonData") InAddPersonDto personDto) {
            // if something goes wrong service layer will throw an exception
            // which will be handled by global exception handler filter
            // once exception happens , transaction gets auto-rollbacked
            HttpStatusCode status = HttpStatus.CREATED;
            String msg = "SUCCESSFUL";
            personService.addPerson(personDto, image);
            return new ResponseEntity<String>(msg, status);
    }
```

