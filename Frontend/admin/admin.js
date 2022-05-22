$(document).ready(function(){
    $('[data-toggle="offcanvas"]').click(function(){
        $("#navigation").toggleClass("hidden-xs");
    });
 });
 
document.getElementById('LogOut').addEventListener('click',LogOut);
function LogOut(e){
    e.preventDefault();
var myHeaders = new Headers();
myHeaders.append("Accept", "application/json, text/plain, */*");
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/api/logout", requestOptions)
  .then(response => response.json())
  .then(result => {
    redirect: window.open("../login/login.html");
    console.log(result);})
  .catch(error => console.log('error', error));
}
