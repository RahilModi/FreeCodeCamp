# user stories:
1.  I can submit a FormData object that includes a file upload.
2.  When I submit something, I will receive the file size in kilo bytes(note: I changed to kilo-bytes instead of bytes) within the JSON response.  

Example Input:
https://freeccfilemetadata.herokuapp.com/  

Example Ouput:  
```json
{
"fileName": "negativesign.jpg",
"fileType": "image/jpeg",
"fileSize": "27.05 kB"
}
```