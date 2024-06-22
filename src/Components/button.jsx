import React from 'react';
import { Link } from 'react-router-dom';

const Button = () => {
  return (
    <div>
       <main className='d-flex justify-content-between align-items-center'>
        <div className=''>
        <h2 className=' text-black'>To-Do</h2>
        </div>
        <div>
        <Link to='/' className='   button1 '>Home</Link>
        <Link to='/login' className='  button2 '>Sign in</Link>
        <Link to='/register' className='  button3 '>Sign up</Link>
        </div>
      </main>
    </div>
  )
}

export default Button
