document.getElementById('loginForm').addEventListener('submit',signIn);
function signIn(e){
    e.preventDefault();
    let email = document.getElementById('email').value;
    let password =document.getElementById('password').value;
    var myHeaders = new Headers();
myHeaders.append("Accept", "application/json, text/plain, */*");

myHeaders.append("Content-Type", "application/json");

    fetch('http://127.0.0.1:8000/api/login',{
        method:'POST',
        mode: 'cors',
        credentials:'same-origin',
        


        headers:myHeaders,
        body:JSON.stringify({email:email,password:password})
    })
    .then(response => response.json())
    .then(result => {console.log(result);
        localStorage.setItem('token',result.jwt);
        redirect: window.open("Frontend\admin\admin.html");
    })
    .catch(error => console.log('error', error));
}
    

