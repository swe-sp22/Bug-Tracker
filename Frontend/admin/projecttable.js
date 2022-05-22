async function loadIntoTable(url,table){
    const tableBody=table.querySelector("tbody");
    var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNzc2OGYxMjBjNzBkODExNGE4ZDlkZGRkZWJmOWU1YjFhYWVkNGRjYWJjMGJmZTZlMDY4NjM4NGEyMWI2ZTVjYmFlZjRhMDJlYzAxNDc1NmIiLCJpYXQiOjE2NTIzMjI2MDQsIm5iZiI6MTY1MjMyMjYwNCwiZXhwIjoxNjgzODU4NjA0LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.rdWlaQuV13kMhJCp-DjPdmk6tjxjj9FlL4MA2JRgQpT83Rfr1AUNyxGYcd--loBIs8OEuuViFznuFPIXm_YhHbIczbZ-3CRNLB5Ke7sY-VTDBAKpODEruMf5pft_hLRX2Nafk1lsKIR6w9cVLP1luTg-_K6_yi6dmK16n3XcSvXW7ZtzbHum0wmelp8oTqV2TFekUB_OCOCrAGy1kDST_6y3qoKxAIpQ3b2HLmgEBkCxNTYp6E2zKRy8z7FoR-9TXHb4PUTLFJHHEQ3xIwmW6UgpVBtzzURieLd9xKtZoGXuogWE2hMLcg1yrXF8dZibAHA2wlfoxSS65BXWd-wThSQ7ZruiWOuhY6Uw3BHoF-VhH9lcP5cKkHNwEHp3Bm-kbVg_tgHVXd-0hEaFRBzWlLwYfYA96j9YAKZSi4ne3osiS2q5f4pk7s2EEPpe_9bcqrB-V2taMgX_HTLVGAXctos32IzhWBr_kGMkC-lIFLf7Nzxk4KS-CivxeoMwBvooMZZh95DauIy7ZAjrBB4ofPwyUUfjHpNfJ9boQErGvX27eEQnlLX7zw0bnIWK3gIw2-tOTmwuGtRb3SEBdh_bOAnKlrs5sFVGxFZ1hjy3R1LL6AitR2rceFwTF-PDciK-pE9AZZWNLNhyQKJVdMS95Qjw82wksA8Q3pIEyAedoVo");
    const response=await fetch(url,{
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    });
    const data=await response.json();

    console.log(data);
    //clear the table 
    tableBody.innerHTML="";
    //populate rows
    if(data.data.length>0){
        var temp="";
        data.data.forEach((itemData) => {
            temp+="<tr>";
            temp+="<td>" + itemData.id + "</td>";
            temp+="<td>" + itemData.title + "</td>";
            temp+="<td>" + itemData.description + "</td>";
            temp+="<td>" + itemData.created_at + "</td>";
            temp+="<td>" + itemData.updated_at + "</td>";

          });
          document.getElementById('tableContent').innerHTML=temp
    }



}
loadIntoTable("http://127.0.0.1:8000/api/projects",document.querySelector("table"))