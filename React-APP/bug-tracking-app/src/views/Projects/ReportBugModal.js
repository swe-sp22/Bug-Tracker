import React, { useState } from 'react'
import { CModalFooter, CModalHeader, CModalTitle, CButton, CModal, CModalBody, CForm,CFormLabel, CFormInput,CFormTextarea } from '@coreui/react'
const ReportBugModal = (props) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState('');
  const [title,setTitle] = useState("Bug title");
  const [description, setDescription] = useState("description");

  const url = 'http://127.0.0.1:8000/api/bugs';
  const token = localStorage.getItem('token');
  var row = JSON.stringify({
    "title": title ,
    "description": description,
    "project_id": props.project_id,
  });

  const createBug = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 
    `Bearer ${token}`)
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: row,
      redirect: 'follow'
    };

    fetch(url,requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    setVisible(!visible);
    location.reload();
  };

  return (
    <>
      <CButton color={props.color} onClick={() => setVisible(!visible)}>Report bug</CButton>
      <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Report bug for project {props.project_id}</CModalTitle>
        </CModalHeader>
        <CModalBody>
        <CForm>
            <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Title</CFormLabel>
                <CFormInput   value={title} onChange={(e) => {setTitle(e.target.value);}} type="text" id="exampleFormControlInput1" placeholder="Bug title"/>
            </div>
            <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Description</CFormLabel>
                <CFormTextarea value={description} onChange={(e) => {setDescription(e.target.value);}}  id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
            </div>
            <div className="mb-3">
                <CFormLabel htmlFor="formFile">Upload screenshot</CFormLabel>
                <CFormInput type="file" id="formFile"/>
            </div>
        </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={createBug}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default ReportBugModal
