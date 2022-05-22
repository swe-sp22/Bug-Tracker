const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit',(e) => {
   e.preventDefault();
   let email = document.getElementById('email').value;
   let password =document.getElementById('password').value;
   console.log(email,password);
   var myHeaders= new Headers();
   myHeaders.append("Accept", "application/json, text/plain, */*");
   myHeaders.append("Content-Type", "application/json");
   const url="http://127.0.0.1:8000/api/login";
   // login-Request
   fetch(url,{
       method:'POST',
       headers:myHeaders,
       redirect:'follow',
       body:JSON.stringify({
           email:email,
           password:password
       })
   })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error',error));
})