document.getElementById('addProject').addEventListener('submit',addProject);
function addProject(e){
    e.preventDefault();
    let title = document.getElementById('title').value;
    let description =document.getElementById('description').value;
    var myHeaders = new Headers();
myHeaders.append("Accept","application/json, text/plain, */*");
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmIzYjBhNDhlNjliNzYzNWRiMmQyOGVhMmJlNjIwM2MxZTg3M2IxYjI3ZDU5ODc4YTY0MDYwZWI4NzA2ZDIzY2Y1ODBlOGJjNzlkZTk3ZmQiLCJpYXQiOjE2NTI0MDI1NDIsIm5iZiI6MTY1MjQwMjU0MiwiZXhwIjoxNjgzOTM4NTQyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.rMS_A4by7Fdlstk9CBgc4NM0sFFbbQ-sKPrF3Qrg32bjeZidD1a9LbXqIkmFIP83B0znW8cNahxFvVmWuToHPWEXv0EfcQHW5qZ02PFQzEUde-DDaju6t4cqbADIH690K-l93EFk9OuCMm8icBanfD7zQS_TEwktZGjouofYlp5wIxqbudQ1X-qyHujkRq6MkJ3gKQa-xYeIKAPmS9NGQINmMRHaDJp7IJcIO0ZBbsuiqAVo-yIC4QSxFT_PcRy1EGzqabCteFSqsy1pe2IHkMWi_RYoLAiyySZRysSLh_lj7WxxFRgDWmJdEC3EilQsDRdEj0u80BkyITWqeYTsVRGuvF3aUdGw7Z1_RM2udHFD8HRVFsfXti9roLYEULP7_GaUCDZRH8QRkRZK4s8VXqs1tEzqEOVnxwyVj-qER9epa-yz170_5xqPD_L3FpZ3UI3b8piwcuLaN8wfRtMxh-cFrUgv2AG86KMnWcZwiuGEzRd5z3mSjaIi2owCAHJfiCVJhGepJqTBPUz3IFu0CMsLVG87S-9d3zqQvQS0cZsM-6eFcTBNmR3EzR6ReWWLA5SiUPDhIjppPidThSK8CpDzAhk5vBH2LJMx6wx8cTMYkqCSOh_0ZlFIs39kWFjpUreDHIgDsbOcw2F1RTtfWmCf1gj92b6DjoWOBFerlM4");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  title: title,
  description: description
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8000/api/projects/", requestOptions)
  .then(response => response.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}