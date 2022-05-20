import React, { useState, useEffect } from 'react'
import { CModalFooter, CModalHeader, CModalTitle, CButton, CModal, CModalBody } from '@coreui/react'
import { nominalTypeHack } from 'prop-types';
const AssignMemberModal = (props) => {
  const [visible, setVisible] = useState(false)

  const [data, setData] = useState([]);
  const [staffMember, setMember] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const url = 'http://127.0.0.1:8000/api/';

  const token = localStorage.getItem('token');
  const handleClick = ()=> {
    setVisible(!visible)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 
    `Bearer ${token}`)
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
        fetch(url+'staff',requestOptions)
        .then(response=>response.json())
        .then(res=>setData(res))
        .catch(error => console.log('error', error));
  };

  const handleSelect =(e) => {
      setMember(e.target.value);
      const member_id = document.getElementById('selection').value;
      
      var myHeaders = new Headers();
      myHeaders.append("Authorization", 
      `Bearer ${token}`)
      myHeaders.append("Content-Type", "application/json");
  
      var requestOptions = {
        method: 'POST',
        body: null,
        headers: myHeaders,
        redirect: 'follow'
      };
  
      fetch(url+'bugs/'+props.bug_id+'/assign/'+member_id,requestOptions)
      .then(response => response.text())
      .then(result => {console.log(result);location.reload();})
      .catch(error => console.log('error', error));
      setVisible(!visible);
  }


  return (
    <>
      <CButton size='sm' color={props.color} onClick={handleClick} >Assign staff member</CButton>
      <CModal scrollable visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle> {data.name} </CModalTitle>
        </CModalHeader>
        <CModalBody>
        <select id='selection'  className="form-select" aria-label="Default select example">
                            <option  selected></option>
                            {
                                data.map(member =>
                                    <option value={member.id}>{member.name}</option>
                                    )
                            }
        </select>

        </CModalBody>
        <CModalFooter>
        <CButton color="primary" onClick={handleSelect}>
            Save Changes
          </CButton>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}
export default AssignMemberModal;
