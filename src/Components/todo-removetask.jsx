


import React, { useState,useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { URL} from '../Url'


const ToDoRemoveTask = () => {
  let navigate = useNavigate();
    const [appointments, setAppointments] = useState([{Appointment_Id:0,Title:'',Description:'',Date:new Date,UserId:''}]);
    let params = useParams();

    useEffect(()=>{
        axios.get(`${URL}/view-task/${params.id}`).then(res=>{
            setAppointments(res.data);   
        })
    },[params.id])

    function handleRemoveClick(){
    axios.delete(`${URL}/delete-task/${params.id}`).then(()=>{
      alert('Task Deleted');
      navigate('/dashboard');
      
    })

   
    }
  return (
   <div className='d-flex justify-content-center align-items-center '>
     <div className='bg-light p-4 m-3 w-50 text-center'>
      <h3>Are you sure? Want to delete the Task?</h3>
      <dl>
        <dt>Title</dt>
        <dd>{appointments[0].Title}</dd>
        <dt>Description</dt>
        <dd>{appointments[0].Description}</dd>
        <dt>Date</dt>
        <dd>{moment(appointments[0].Date).format('MMM Do YYYY, ddd')}</dd>
      </dl>
      <button onClick={handleRemoveClick} className='btn btn-danger m-2'>YES</button>
    <Link to='/dashboard'>  <button className='btn btn-warning m-2'>NO</button></Link>
    </div>
   </div>
  )
}

export default ToDoRemoveTask;