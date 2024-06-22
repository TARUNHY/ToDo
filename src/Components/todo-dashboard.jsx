import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const TodoDashboard = () => {
    const [cookies,setCookie,removeCookie] = useCookies('userid');
    const [appointments,setAppointments] = useState([{Appointment_Id :0,Title:'',Description:'',Date:new Date(),UserId:''}])
    const navigate = useNavigate();

    function handleChange (){
        removeCookie('userid');
        navigate('/login')
    }
    useEffect(()=>{
        if(cookies['userid']===undefined){
            navigate('/login')
        }else{
            axios.get(`http://localhost:4000/view-tasks/${cookies['userid']}`).then(res=>{
                setAppointments(res.data);
            })
        }
    },[])

  return (
<div className='d-flex justify-content-center align-items-center'>
<div className='bg-light p-4 m-3 form-w'>
  <h4  className='d-flex justify-content-between'> <span>{cookies['userid']} - DashBoard </span>         <Link to='/login' ><button onClick={handleChange} className='btn btn-danger'>Sign out</button></Link></h4>
  <main>
            <div><h2>your Appoinments</h2></div>
            <Link to='/addtask' className='btn btn-primary bi bi-calendar my-2'> Add Appointment</Link>
            {
               appointments.map(appointment=>
                <div className='alert alert-success alert-dismissible'>
                    <button className='btn btn-close' data-bs-dismiss='alert'></button>
                    <h3>{appointment.Title}</h3>
                    <p>{appointment.Description}</p>
                     <p>{moment(appointment.Date).format('ddd, MMM Do YYYY')}</p>
                     <Link to={`/edit/${appointment.Appointment_Id}`}><button className='btn btn-warning bi bi-pen-fill m-2'>Edit</button></Link>
                    <Link to={`/removetask/${appointment.Appointment_Id}`}> <button className='btn btn-danger bi bi-trash m-2 '>Remove</button></Link>
                </div>
               ) 
            }
        </main>
 </div>
 
    
</div>
  )
}

export default TodoDashboard
