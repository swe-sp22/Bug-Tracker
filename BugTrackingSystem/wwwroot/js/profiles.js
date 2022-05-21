const uri = '/api/Profiles';

function makeStaffMember() {
    const userName = document.getElementById('UserName').innerText;


    fetch(`${uri}/${userName}/MakeStaff`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => window.location.assign(`/Profiles/Details/${userName}`))
            .catch(error => console.error('Unable to add item.', error));
}

function makeAdmin() {
    const userName = document.getElementById('UserName').innerText;


    fetch(`${uri}/${userName}/MakeAdmin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => window.location.assign(`/Profiles/Details/${userName}`))
            .catch(error => console.error('Unable to add item.', error));
}
