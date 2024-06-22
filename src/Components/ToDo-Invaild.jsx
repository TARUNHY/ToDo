import React from 'react';
import { Link } from 'react-router-dom';

const ToDoInvaild = () => {
  return (
    <div className='text-center mt-5'>
        <h2 className='text-dark'>Invaild Credentials</h2>
        <Link to='/login'>try again</Link>
      
    </div>
  )
}

export default ToDoInvaild
