import React, { useEffect, useState } from 'react'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cifEg,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import { useNavigate } from 'react-router-dom';

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {

  const navigate = useNavigate();

  if(!localStorage.getItem('token') || localStorage.getItem('token')==='undefined')
  {
    navigate('/login')
  }
  
  const [staff, setStaff] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalBugs, setTotalBugs] = useState('');
  const [totalProjects, setTotalProjects] = useState('');
  const url = 'http://127.0.0.1:8000/api/'
  const token = localStorage.getItem('token');

  const getData = async () => {
    
    setIsLoading(true);
    var myHeaders = new Headers();
    const token = localStorage.getItem('token');
    myHeaders.append("Authorization", 
    `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    try {
      const response = await fetch(url+'staff',requestOptions)
      const bugsCount = await fetch(url+'bug/count', requestOptions);
      const projectsCount = await fetch(url+'project/count', requestOptions);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();
      const bugs_result = await bugsCount.json();
      const project_result = await projectsCount.json();

      setStaff(result);
      setTotalBugs(bugs_result[0]);
      setTotalProjects(project_result[0]);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
    };
    console.log(staff);

    useEffect(()=>{
      getData();
    },[]);

    const staffMembers = [];
    staff.map(member => (
      staffMembers.push(      {
        avatar: { src: avatar1, status: 'success' },
        user: {
          name: member.name,
          new: true,
          registered: member.created_at,
        },
        country: { name: 'EGY', flag: cifEg },
        usage: {
          value: 1,
          period: '2022',
          color: 'success',
        },
        activity: '10 sec ago',
      })
      ));

  return (
    <>
      <WidgetsDropdown  totalBugs={totalBugs} totalProjects={totalProjects} totalMembers={staff.length} />
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Staff Members</CCardHeader>
            <CCardBody>

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Staff Member</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Country</CTableHeaderCell>
                    <CTableHeaderCell>Total Assigned Bugs</CTableHeaderCell>
                    <CTableHeaderCell>Activity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {staffMembers.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      
                      <CTableDataCell>
                        <div>{item.user.name}</div>
                        <div className="small text-medium-emphasis">
                          <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                          {item.user.registered}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <CIcon size="xl" icon={item.country.flag} title={item.country.name} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.usage.value}%</strong>
                          </div>
                          <div className="float-end">
                            <small className="text-medium-emphasis">{item.usage.period}</small>
                          </div>
                        </div>
                        <CProgress thin color={item.usage.color} value={item.usage.value} />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="small text-medium-emphasis">Last login</div>
                        <strong>{item.activity}</strong>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}
export default Dashboard
