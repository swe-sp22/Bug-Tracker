import React, {useEffect, useState} from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../login/Login.css';

const Register = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [role_id,setRoleID] = useState("");
  const [password,setPassword] = useState("");
  const [password_confirmed,setConfirmation] = useState("");

const url = 'http://127.0.0.1:8000/api/register';
  const token = localStorage.getItem('token');
  var row = JSON.stringify({
    "name": name ,
    "email": email,
    "role_id": role_id,
    "password": password,
    "password_confirmed": password_confirmed
  });

  const handleRegister = ()=>{
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
    .then(result => {alert(result);location.reload();})
    .catch(error => alert('error', error));
  };

  return (
    <div className="background-radial-gradient min-vh-100 min-height d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create an admin, staff member or custmer account </p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput value={name} onChange={(e) => {setName(e.target.value);}} placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput value={email} onChange={(e) => {setEmail(e.target.value);}} placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>R</CInputGroupText>
                    <select  className="form-select" aria-label="Default select example" onChange={(e) => {setRoleID(e.target.value);}} >
                            <option value='1' selected>Admin</option>
                            <option  value='2'>Staff Member</option>
                            <option  value='3'>Customer</option>
                      </select>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                    value={password} onChange={(e) => {setPassword(e.target.value);}}
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                    value={password_confirmed} onChange={(e) => {setConfirmation(e.target.value);}}
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="primary" onClick={handleRegister}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
