import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { URL} from '../Url'

import axios from 'axios'

const TodoRegister = () => {

  const [msg, setMsg] = useState();
  const [col, setCol] = useState();
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues : {
      UserId:'',
      UserName : '',
      Password : '',
      Email : '',
      Mobile : ''
    },

    onSubmit:(user)=>{
      axios.post(`${URL}/register-user`, user)
      .then(()=>{
        alert('User Registered');
        navigate('/login');
      })
    }
  })

  function verifyUserId(e){
    axios.get(`${URL}/get-users`).then(res=>{
      for(var user of res.data)
        {
          if(user.UserId === e.target.value){
            setMsg('UserId Already Taken');
            setCol('text-danger');
            break;
          }else{
            setMsg('Avaliable');
            setCol('text-success');
          }
        };
    })
  }
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <form onSubmit={formik.handleSubmit} className='bg-light p-4 m-3 border border-2 border-dark rounded form'>
        <div className='text-center h5 bi bi-person-fill '>Register Here</div>
        <dl>
            <dt>UserId</dt>
            <dd><input onKeyUp={verifyUserId} autoComplete='false' type="text" name='UserId' onChange={formik.handleChange} className='form-control' /></dd>
            <dd className={col}>{msg}</dd>
            <dt>UserName</dt>
            <dd><input type="text" autoComplete='false' name='UserName' onChange={formik.handleChange} className='form-control' /></dd>
            <dt>Password</dt>
            <dd><input type="password" autoComplete='false' name='Password' onChange={formik.handleChange} className='form-control' /></dd>
            <dt>E-Mail</dt>
            <dd><input type="email" autoComplete='false' name='Email' onChange={formik.handleChange}  className='form-control'/></dd>
            <dt>Mobile</dt>
            <dd><input type="text" autoComplete='false' name='Mobile' onChange={formik.handleChange} className='form-control' /></dd>
        </dl>
        <button type='submit' className='btn btn-danger w-100'>Register</button>
      
      </form>
      
    </div>
  )
}

export default TodoRegister
