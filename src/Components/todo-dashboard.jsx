import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { URL } from '../Url';

const TodoDashboard = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['userid']);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();

    function handleChange() {
        removeCookie('userid');
        navigate('/login');
    }

    useEffect(() => {
        if (cookies['userid'] === undefined) {
            navigate('/login');
        } else {
            axios.get(`${URL}/view-tasks/${cookies['userid']}`).then(res => {
                console.log('API Response:', res.data);
                setAppointments(res.data);
            }).catch(err => {
                console.error('Error fetching appointments:', err);
            });
        }
    }, [cookies, navigate]);

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <div className='bg-light p-4 m-3 form-w'>
                <h4 className='d-flex justify-content-between'>
                    <span>{cookies['userid']} - DashBoard</span>
                    <Link to='/login'><button onClick={handleChange} className='btn btn-danger'>Sign out</button></Link>
                </h4>
                <main>
                    <div><h2>Your Appointments</h2></div>
                    <Link to='/addtask' className='btn btn-primary bi bi-calendar my-2'>Add Appointment</Link>
                    {
                        appointments.map(appointment =>
                            <div key={appointment.Appointment_Id} className='alert alert-success alert-dismissible'>
                                <button className='btn btn-close' data-bs-dismiss='alert'></button>
                                <h3>{appointment.Title}</h3>
                                <p>{appointment.Description}</p>
                                <p>{moment(appointment.Date).format('ddd, MMM Do YYYY')}</p>
                                <Link to={`/edit/${appointment.Appointment_Id}`}><button type='submit' className='btn btn-warning bi bi-pen-fill m-2'>Edit</button></Link>
                                <Link to={`/removetask/${appointment.Appointment_Id}`}><button type='submit' className='btn btn-danger bi bi-trash m-2'>Remove</button></Link>
                            </div>
                        )
                    }
                </main>
            </div>
        </div>
    );
};

export default TodoDashboard;
