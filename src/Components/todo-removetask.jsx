import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { URL } from '../Url';

const ToDoRemoveTask = () => {
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null); // Initialize with null
    const params = useParams();

    useEffect(() => {
        axios.get(`${URL}/view-task/${params.id}`).then(res => {
            setAppointment(res.data); // Set fetched data to state
        }).catch(error => {
            console.error('Error fetching data:', error);
            setAppointment({}); // Handle error state
        });
    }, [params.id]);

    const handleRemoveClick = () => {
        axios.delete(`${URL}/delete-task/${params.id}`).then(() => {
            alert('Task Deleted');
            navigate('/dashboard');
        }).catch(error => {
            console.error('Error deleting task:', error);
            alert('Failed to delete task');
        });
    }

   

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='bg-light p-4 m-3 w-50 text-center'>
                <h3>Are you sure? Want to delete the Task?</h3>
                {appointment.Appointment_Id ? (
                    <dl>
                        <dt>Title</dt>
                        <dd>{appointment.Title}</dd>
                        <dt>Description</dt>
                        <dd>{appointment.Description}</dd>
                        <dt>Date</dt>
                        <dd>{moment(appointment.Date).format('MMM Do YYYY, ddd')}</dd>
                    </dl>
                ) : (
                    <p>No task found.</p>
                )}
                <button onClick={handleRemoveClick} type='submit' className='btn btn-danger m-2'>YES</button>
                <Link to='/dashboard'><button type='submit' className='btn btn-warning m-2'>NO</button></Link>
            </div>
        </div>
    );
}

export default ToDoRemoveTask;
