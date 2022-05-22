import React, { useState } from 'react'
import { CModalFooter, CModalHeader, CModalTitle, CButton, CModal, CModalBody } from '@coreui/react'
const DeleteProjectModal = (props) => {
  const [visible, setVisible] = useState(false);
  const token = localStorage.getItem('token');
  const url = 'http://127.0.0.1:8000/api/';

  const deleteBug =()=> {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 
    `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'DELETE',
      body: null,
      headers: myHeaders,
      redirect: 'follow'
    };
    

    fetch(url+'projects/'+props.project_id,requestOptions)
    .then(response => response.text())
    .then(result => swal("Good job!", "Project as been Deleted!", "success"))
    .catch(error => console.log('error', error));
      setTimeout(() => {
        setVisible(!visible);
        location.reload();
      }, 2000);
    setVisible(!visible);

  }
  return (
    <>
      <CButton size='sm' color={props.color} onClick={() => setVisible(!visible)}>{props.title}</CButton>
      <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{props.title}</CModalTitle>
        </CModalHeader>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={deleteBug}>Delete Project</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default DeleteProjectModal
