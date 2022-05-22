import React, { useState, useEffect } from 'react'
import 'simplebar/dist/simplebar.min.css'
import { CTable, CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react'
import { CTableBody } from '@coreui/react'
import { CTableDataCell } from '@coreui/react'
import { CTableHead } from '@coreui/react'
import { CTableHeaderCell } from '@coreui/react'
import { CTableRow } from '@coreui/react'
import Modal from './Modal'
import AssigneeModal from './AssigneeModal';
import ReportBugModal from './ReportBugModal';
import AddProjectModal from "./AddProjectModal";
import AssignMemberModal from './AssignMemberModal'
// sidebar nav config
const Projects = () => {
  const [value,setValue]=useState('');
  const [projects, setData] = useState([]);
  const [bugID, setBugID] = useState('');
  const url = 'http://127.0.0.1:8000/api/projects'

  const getProjects =()=>{
    var myHeaders = new Headers();
    const token = localStorage.getItem('token');
    myHeaders.append("Authorization", 
    `Bearer ${token}`)
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(({ data: projects}) => {
      setData(projects);
      console.log(projects);
    });

  }
  useEffect(()=>{
    getProjects();
  },[]);
  

  const changeStatus =(e)=>{
    var status = (e.target.value);
    console.log(status);
    const bug_id = status.charAt(status.length - 1);
    console.log(bug_id);
    status = status.substring(0, status.length - 1);
    var myHeaders = new Headers();
    const token = localStorage.getItem('token');
  
    var row = JSON.stringify({
      "status": status
    });

    myHeaders.append("Authorization", 
    `Bearer ${token}`)

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: row,
      redirect: 'follow'
    };

    fetch('http://127.0.0.1:8000/api/bugs/status/'+bug_id, requestOptions)
    .then(response => response.json())
    .then(result => swal("Good job!", "Bug status changed!", "success")
  )
    .catch(error => alert('error', error));

    };

  return (
    <div>
    <CTableDataCell><AddProjectModal color='dark' title="Add Project"></AddProjectModal></CTableDataCell>
    <CTable striped>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">ID</CTableHeaderCell>
          <CTableHeaderCell scope="col">Title</CTableHeaderCell>
          <CTableHeaderCell scope="col">Description</CTableHeaderCell>
          <CTableHeaderCell scope="col">Bug Report</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      {
          projects.map(project => (
            <CTableBody>
            <CTableRow>
              <CTableHeaderCell scope="row">{project.id}</CTableHeaderCell>
              <CTableDataCell>{project.title}</CTableDataCell>
              <CTableDataCell>{project.description}</CTableDataCell>
              <CTableDataCell><ReportBugModal color='warning' project_id={project.id}></ReportBugModal></CTableDataCell>
            </CTableRow>
            <CTableRow>
              <CTableHeaderCell colSpan="4">
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Bugs</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Assigned staff member</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {
                      project.bugs.map(bug => (

                      
                    <CTableRow>
                      <CTableHeaderCell scope="row">
                        <Modal bug_id={bug.id} title={bug.title} description={bug.description} bug_photo={bug.photo} color="danger"></Modal>
                      </CTableHeaderCell>
                      <CTableDataCell> 
                      {  
                      bug.assignee_id ? (
                        <AssigneeModal title={bug.assignee_id} id={bug.assignee_id} color="primary"></AssigneeModal>
                        )
                        :(<AssignMemberModal bug_id={bug.id} color="secondary"></AssignMemberModal>)}
                        
                      </CTableDataCell>
                      <select  className="form-select" aria-label="Default select example" onChange={changeStatus} >
                            <option  selected>{bug.status}</option>
                            <option value={`ASSIGNED${bug.id}`}>ASSIGNED</option>
                            <option  value={`OPEN${bug.id}`}>OPEN</option>
                            <option  value={`CLOSED${bug.id}`}>CLOSED</option>
                      </select>
                    </CTableRow>
                      ))}
                  </CTableBody>
                </CTable>
              </CTableHeaderCell>
            </CTableRow>
          </CTableBody>
          ))
          }

    </CTable>
    </div>
  )
}
export default Projects
