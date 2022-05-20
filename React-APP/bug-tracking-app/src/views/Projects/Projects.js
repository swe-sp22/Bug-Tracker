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
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYmMwYjc0NWFmYWRlMjRkMTgzNGRjYjQ2YTkzOTAzODc0ODRiZjJiNTY1YWRkNGU4ZDRiZDQzY2FkMzExY2MzYzUzODA0YzFkZjE1NDYwMzMiLCJpYXQiOjE2NTI3OTk3MDUsIm5iZiI6MTY1Mjc5OTcwNSwiZXhwIjoxNjg0MzM1NzA1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.WGDcXMJ-uUy-1vs7pXQGkkoNw97tX_XTMgWxxH-qSnMvYcw1Gb4ywKvZxnfWwvEvc-wYZt7fXXB9kXGiNyHDAhipc33H0zHD1OF7Jl8dkpqoFCJW9VdQeaECysbVL8RO3qMqCWUQdm_-gIgj9pucTDhsX7LctqfwfiJP3P7i2zVrhPoApRFPO9ywg10LepGvLhka1td6MCID_tRtPBQxfJ6LIyO52Afno9UvTXQgp3mtPwNst42kfgkYyD3PFdetR0sEVruJH5X6EiabvTK2VLlRb6ZAOD6fcMjKnvF00alrNyhE6jnOCHoVLUO76vUrS80Cnu4JihwrkXZfzh0G7aBFCmszUrEJLdVl65Ktlf3QcPTqmtxCKqEHlD-00Z2ReR32IGIVNGoidYENu4mNL5DOK5A338OnpqOSZh0AEQV05z11zqHYkDh2T2Y7rSCvOPJ_M8L7_r5rfWsN4MP6MUfuWn1_HleoKbEMYHOW521jqDLHJgMZiMmtNKSTF0uUDjsEc6JcZO0xQjgoG9GtyDjX5HZk7H307xQro_Z5b-3YLU-vPWBrwIDgxkLHClvezumboIURTT0CoMM7LsYr1h_AyiiFE0ez71ym7A9HnSfQ0i3VIiPCGURMMUCJ_wMSbg4BVSUFXRMToQ4aR19PLbKaK7ANUQfSdUo5VDcp0c0");

    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: row,
      redirect: 'follow'
    };

    fetch('http://127.0.0.1:8000/api/bugs/status/'+bug_id, requestOptions)
    .then(response => response.json())
    .then(result => alert("Bug status changed.."))
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
