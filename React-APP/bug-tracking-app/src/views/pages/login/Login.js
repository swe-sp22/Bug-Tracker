import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser, cilBug } from '@coreui/icons'
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const url = 'http://127.0.0.1:8000/api/login';
  var row = JSON.stringify({
    "email": email,
    "password": password
  });

  const handleLogin = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: row,
      redirect: 'follow'
    };

    fetch(url,requestOptions)
    .then(response => response.json())
    .then(result => {
      localStorage.setItem('token',result.jwt);
      localStorage.setItem('role', result.role_id);
      navigate('/dashboard');
    })
    .catch(error => alert(error));
    
  };

  const goHome = ()=>{
    navigate('/dashboard');
  }
  return (
    <div className="background-radial-gradient min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
        <CCol md={4}>
        <h1 class="my-5 display-5 fw-bold ls-tight" style={{color: "hsl(218, 81%, 95%)"}}>
                    The best offer <br />
                    <span style={{color: "hsl(218, 81%, 75%)"}}>for your business</span>
                </h1>
                <p class="mb-4 opacity-70" style={{color: "hsl(218, 81%, 85%)"}}>
                    Bugso makes collabration with team members and clients. Easy fast and professional!
                </p>
        </CCol>
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                  <span class="h1 fw-bold mb-0">Bugso </span>
                  <CIcon icon={cilBug} size="2xl" /><br/>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email" autoComplete="email" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                      value={password} onChange={(e) => {setPassword(e.target.value)}}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                      Already logged in?<CButton onClick={goHome} color="link" className="px-0"> Go to dashboard
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
