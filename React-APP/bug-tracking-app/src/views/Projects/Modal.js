import React, { useState } from 'react'
import { CModalFooter, CModalHeader, CModalTitle, CButton, CModal, CModalBody } from '@coreui/react'
const Modal = (props) => {
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

    fetch(url+'bugs/'+props.bug_id,requestOptions)
    .then(response => response.text())
    .then(result => alert(result))
    .catch(error => console.log('error', error));
      setTimeout(() => {
        setVisible(!visible);
        location.reload();
      }, 2000);
    setVisible(!visible);

  }
  return (
    <>
      <CButton color={props.color} onClick={() => setVisible(!visible)}>{props.title}</CButton>
      <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{props.title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
            ID: {props.bug_id}
          </p>
          <p>
              {props.description}
          </p>
          <p>
            <img src={props.bug_photo} alt="No screenshot found"></img>
          </p>
          
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={deleteBug}>Delete Bug</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default Modal
