import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL} from '../Url'

const TodoAddTask = () => {
    const navigate = useNavigate();
 const [cookies,setCookie,removeCookie] = useCookies('userid');
 const formik = useFormik({
    initialValues : {
        Appointment_Id :0,
        Title : '',
        Description : '',
        Date : '',
        UserId :cookies['userid']
    },
    onSubmit : (task)=>{
    axios.post(`${URL}/add-task` , task);
    alert('Task added successfully');
    navigate('/dashboard');
    }
 })
  return (
   <div className='d-flex justify-content-center align-items-center'>
     <div className='bg-light p-4 m-3'>
        <form onSubmit={formik.handleSubmit}>
            <h3 className='text-center text-info'>{cookies['userid']} - Add Appointment</h3>
            <dl>
                <dt>Appointment_Id</dt>
                <dd><input type="number" name='Appointment_Id' onChange={formik.handleChange} className='form-control' /></dd>
                <dt>Title</dt>
                <dd><input type="text" name='Title' onChange={formik.handleChange} className='form-control' /></dd>
                <dt>Description</dt>
                <dd>
                    <textarea rows='4' name='Description' onChange={formik.handleChange} cols='40' className='form-control'></textarea>
                </dd>
                <dt>Date</dt>
                <dd><input type="date" name='Date' onChange={formik.handleChange} className='form-control' /></dd>
            </dl>
            <Link to='/dashboard'><button type='submit' className='btn btn-warning w-50'>Cancel</button></Link>
            <button type='submit' className='btn btn-danger  w-50 '>Submit</button>
        </form>
      
    </div>
   </div>
  )
}

export default TodoAddTask
