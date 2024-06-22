import React from 'react';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import {useCookies } from 'react-cookie';
import moment from 'moment';
import { URL} from '../Url'




const TodoEditTask = () => {
  const [cookies , setCookie,removeCookie] = useCookies('userid');

    let navigate = useNavigate();
    const [appointments, setAppointments] = useState([{Appointment_Id:0,Title:'',Description:'',Date:new Date(),UserId:''}]);
    let params = useParams();

    useEffect(()=>{
        axios.get(`${URL}/view-task/${params.id}`).then(res=>{
            setAppointments(res.data);   
        })
    },[params.id])
    var formik = useFormik({
     initialValues : {
        Appointment_Id : appointments[0].Appointment_Id,
        Title : appointments[0].Title,
        Description : appointments[0].Description,
        Date : moment(appointments[0].Date).format('YYYY-MM-DD'),
        UserId : cookies['userid']
     },
     onSubmit:(task)=>{
        axios.put(`${URL}/edit-task/${params.id}`, task).then(()=>{
         alert('Edited Successfully');
         navigate('/dashboard');
        })
     },
     enableReinitialize : true
    })
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='bg-light p-4 m-3 border border-dark'>
        <h3 className='text-center text-danger'>Edit Details</h3>
        <form onSubmit={formik.handleSubmit}>
           <dl>
           <dt>Application_Id</dt>
            <dd><input type="number" value={formik.values.Appointment_Id}  name='Application_Id' className='form-control' /></dd>
            <dt>Title</dt>
            <dd><input type="text" value={formik.values.Title} name='Title' onChange={formik.handleChange} className='form-control' /></dd>
            <dt>Description</dt>
            <textarea rows='4' cols='40' value={formik.values.Description} name='Description' onChange={formik.handleChange} className='form-control'> </textarea>
            <dt>Date</dt>
            <dd><input type="date" name='Date' value={formik.values.Date} onChange={formik.handleChange} className='form-control' /></dd>
           </dl>
          <Link to='/dashboard'> <button className='btn btn-danger m-2'>Cancel</button></Link>
           <button className='btn btn-success m-2'>Save</button>
        </form>
      </div>
    </div>
  )
}

export default TodoEditTask


