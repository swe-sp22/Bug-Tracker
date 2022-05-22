const tableBody = document.querySelector
    ('#tableContent');
const addProjectForm = document.getElementById('addProject');

let output = '';
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
var getrequestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};
let title1 = document.getElementById('title');
let description1 = document.getElementById('description');

const renderProject = (projects) => {
    projects.forEach(project => {
        output += `<tr id="rowbody" data-id=${project.id}>
        <td>${project.id}</td>
        <td class="cell-title">${project.title}</td>
        <td class="cell-textBox">${project.description}</td>
        <td>${project.created_at}</td>
        <td>${project.updated_at}</td>
        <td><a href="#" class="view btn-sm active " id="edit-project" data-toggle="modal" data-target="#update_project">Edit</a></td>
        <td><a href="#" class="view btn-sm active" id="delete-project">Delete</a></td>

        </tr>`;
    });
    tableBody.innerHTML = output;
}

const url = 'http://127.0.0.1:8000/api/projects';

//create the project
addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    var raw = JSON.stringify({
        title: title.value,
        description: description.value
    });

    var postrequestOptions = {
        method: 'POST',
        Credentials: "include",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json, text/plain, */*'
        },
        body: raw,
        redirect: 'follow'
    }
    fetch(url, postrequestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const dataArr = [];
            dataArr.push(data);
            renderProject(dataArr);

        })
        .catch(error => console.log('error', error));


})
//Read Projects
fetch(url, getrequestOptions)
    .then(response => { return response.json(); })
    .then(data => renderProject(data.data))
//Delete and edit    
tableBody.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id == 'delete-project';
    let editButtonIsPressed = e.target.id == 'edit-project';
    let rowIsClicked = e.target.parentElement.id == 'rowbody';
    let id = e.target.parentElement.parentElement.dataset.id;
    let idRow = e.target.parentElement.dataset.id;
    var replacement = '';
    //Delete -Remove existing project
    if (delButtonIsPressed) {
        console.log(id);
        fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        })
            .then(res => res.json)
            .then((result) => {
                console.log(result);
                location.reload();
            })
            .catch(error => console.log('error', error));
    }
    if (rowIsClicked) {
        console.log(idRow);
        fetch(`${url}/${idRow}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${window.localStorage.getItem('token')}`,
                'Accept': 'application/json, text/plain, */*'

            },
            redirect: 'follow'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                replacement += 
                    ` <div class="col-md-4 col-sm-6 content-card">
                        <div class="card-big-shadow">
                            <div class="card card-just-text"       data-background="color" data-color="blue" data-radius="none">
                                <div class="content">
                                   <h4 class="card-title">${data.title}</h4>
                                   <h5 class="created-at">${data.created_at}</h5>
                                   <h5 class="updated-at">${data.updated_at}</h5>
                                   <h6 class="card-id mb-2 text-muted">${data.id}</h6>
                                   <p class="description">${data.description}</p>
                                   <a href="#" class="card-link">Edit</a>
                                   <a href="#" class="card-link">view bugs</a>
                                </div>
                            </div>
                        </div>    
                    </div>`;
            })
        document.getElementById('projectDash').innerHTML = '';


        document.getElementById('projectDash').innerHTML = replacement;
    }
})