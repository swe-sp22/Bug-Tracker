import React, { useState } from 'react'
import { CModalFooter, CModalHeader, CModalTitle, CButton, CModal, CModalBody, CForm,CFormLabel, CFormInput,CFormTextarea } from '@coreui/react'
const UpdateProjectModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [title,setTitle] = useState(props.project_title);
  const [description, setDescription] = useState(props.project_description);

  const url = 'http://127.0.0.1:8000/api/projects/';
  const token = localStorage.getItem('token');
  var row = JSON.stringify({
    "title": title ,
    "description": description
  });

  const createProject = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 
    `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: row,
      redirect: 'follow'
    };

    fetch(url+props.project_id,requestOptions)
    .then(response => {
      console.log(response.text());
      if(response.status == 200) {
      swal("Good job!", "Bug Project updated Succesfully", "success").then(function() {location.reload();setVisible(!visible);});
      }
      else {
        swal(`Error ${response.status}`, "Project can't be updated", "error");
      }
    })
    .catch(error => console.log('error', error));
  };

  return (
    <>
      <CButton size='sm' color={props.color} onClick={() => setVisible(!visible)}>{props.title}</CButton>
      <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Report bug for project {props.project_id}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CForm>
            <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                <CFormInput   value={title} onChange={(e) => {setTitle(e.target.value);}} type="text" id="exampleFormControlInput1" placeholder="Project title" required />
            </div>
            <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea value={description} onChange={(e) => {setDescription(e.target.value);}}  id="exampleFormControlTextarea1" rows="3" required></CFormTextarea>
            </div>
        </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={createProject}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default UpdateProjectModal
