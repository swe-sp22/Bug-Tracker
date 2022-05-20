import React, { useState, useEffect } from 'react'
import { CModalFooter, CModalHeader, CModalTitle, CButton, CModal, CModalBody } from '@coreui/react'
const AssigneeModal = (props) => {
  const [visible, setVisible] = useState(false)

  const [data, setData] = useState({data: []});
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const url = 'http://127.0.0.1:8000/api/users/'+ props.id;
  const getUser =()=>{

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

  }
  const handleClick = async () => {
    setVisible(!visible)
    setIsLoading(true);
    var myHeaders = new Headers();
    const token = localStorage.getItem('token');
    myHeaders.append("Authorization", 
    `Bearer ${token}`)
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(url,requestOptions)
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result.data);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);



  return (
    <>
      <CButton size='sm' color={props.color} onClick={handleClick} >Assignee Details</CButton>
      <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle> {data.name} </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>
              {data.email}
          </p>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default AssigneeModal;
