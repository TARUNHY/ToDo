
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import  axios  from 'axios';
import { useCookies } from 'react-cookie';
import { URL} from '../Url'

const ToDoLogin = () => {

  const [cookies,setCookie,removeCookie] = useCookies('userid');
  let navigate = useNavigate();
  const formik = useFormik({
    initialValues : {
      UserId : '',
      Password : ''
    },
    onSubmit : (user)=>{
      axios.get(`${URL}/get-users`).then(res=>{
        var client = res.data.find(record => record.UserId === user.UserId);
        if(client){
          if(user.Password === client.Password){
            setCookie('userid',user.UserId)
            navigate('/dashboard');
          }else{
            navigate('/error');
          }
        }else{
          navigate('/error');
        }
      })
    }
  })
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <form onSubmit={formik.handleSubmit} className='bg-light p-4 m-3 border border-2 border-black rounded form'>
        <div className='h4 text-center'>User Login</div>
        <dl>
          <dt>UserId</dt>
          <dd><input type="text" name='UserId' onChange={formik.handleChange} autoComplete='false' className='form-control' /></dd>
          <dt>Password</dt>
          <dd><input type="password" name='Password' onChange={formik.handleChange}  autoComplete='true'  className='form-control' /></dd>
        </dl>
        <button type='submit' className='btn btn-danger w-100'>Login</button>
      </form>
    </div>
  )
}

export default ToDoLogin
