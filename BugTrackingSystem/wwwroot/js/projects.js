const uri = '/api/Projects';

function addProject() {
    const projectName = document.getElementById('Name').value.trim();
    const projectDescription = document.getElementById('Description').value.trim();

    const project = {
        Name: projectName,
        Description: projectDescription
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        body: JSON.stringify(project)
    })
        .then(response => response.json())
        .catch(error => console.error('Unable to add item.', error));
}

function editProject() {
    const projectId = document.getElementById('Id').value;
    const project = {
        Id: parseInt(projectId),
        Name: document.getElementById('Name').value.trim(),
        Description: document.getElementById('Description').value.trim()
    }

    fetch(`${uri}/${projectId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    })
        .then(response => window.location.assign(`/Projects/Details/${projectId}`))
        .catch(error => console.error('Unable to update item.', error));
}

function deleteProject() {
    const projectId = document.getElementById('Id').value;
    fetch(`${uri}/${projectId}`, {
        method: 'DELETE'
    })
        .then(response => window.location.assign(`/Projects`))
        .catch(error => console.error('Unable to delete item.', error));
}
