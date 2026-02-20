import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';

const HomeAppointment = () => {

    const [appointmentForm ,setAppointmentForm] = useState({
        customer_name:"",
        customer_email:"",
        customer_phone:"",
        persons:"",
        service_id:"",
        appointment_date:"",
        appointment_time:"",
        address:"",
        message:""
    });

    const [service,setService] = useState([]);

    const token = localStorage.getItem("token");

    const fetchService = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/service/getAll");
            const ActiveService = res.data.data.filter(
                (items)=>items.status === 1
            );
            setService(ActiveService);
        } catch (error) {
            console.error("Error Whie Fetch Service",error)
        }
    }

    useEffect(()=>{
        fetchService();
    },[]);

    const handleChnage = (e)=>{
        setAppointmentForm({
            ...appointmentForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/appointment/create",appointmentForm,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setAppointmentForm({
                customer_name:"",customer_email:"",customer_phone:"",
                persons:"",service_id:"", appointment_date:"",appointment_time:"",address:"",message:""
            })
            toast.success("Form Submitted...")
        } catch (error) {
            console.error("Errror while submit form",error);
        }
    }


  return (
    <section className="home-appointment-section">
        <section className="containers">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className="home-appointemnt-left">
                        <span className='appoint-sub'>For Your Services</span>
                        <h2 className='appoint-title'>Make An Appointment</h2>

                        <form className="home-appointment-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        name='customer_name'
                                        value={appointmentForm.customer_name}
                                        onChange={handleChnage}
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        name='customer_email'
                                        value={appointmentForm.customer_email}
                                        onChange={handleChnage}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number"
                                        name='customer_phone'
                                        value={appointmentForm.customer_phone}
                                        onChange={handleChnage}
                                    />
                                </div>
                                <div className="form-group">
                                    <select name='persons' onChange={handleChnage}>
                                        <option value="">Select Person</option>
                                        <option value="1">1 Person</option>
                                        <option value="2">2 Persons</option>
                                        <option value="3">3 Persons</option>
                                        <option value="4+">4+ Persons</option>
                                    </select>
                                </div>
                            </div>

                            <div className="appoint-form-row">
                                <div className="form-groups">
                                    <select
                                        name="service_id"
                                        value={appointmentForm.service_id}
                                        onChange={handleChnage}
                                    >
                                        <option value="">Select Service</option>
                                        {service.map((item)=>(
                                            <option value={item.id} key={item.id} >
                                                {item.service_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input 
                                        type="date" 
                                        name='appointment_date'
                                        value={appointmentForm.appointment_date}
                                        onChange={handleChnage}
                                    />
                                </div>
                                <div className="form-groups">
                                    <input 
                                        type="time"
                                        name="appointment_time"
                                        placeholder='select time'
                                        value={appointmentForm.appointment_time}
                                        onChange={handleChnage}
                                    />
                                </div>
                            </div>

                            <div className='appoint-form-row'>
                                <div className="form-groups">
                                    <input 
                                        type="text" 
                                        placeholder="Address" 
                                        name='address'
                                        value={appointmentForm.address}
                                        onChange={handleChnage}
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <textarea rows="5" 
                                    placeholder="Your Message"
                                    name='message'
                                    value={appointmentForm.message}
                                    onChange={handleChnage}
                                ></textarea>
                            </div>

                            <button type="submit" className="book-btn">
                                Book Now
                            </button>

                        </form>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="home-appointemnt-right">
                        <img src="/image/home/appointment/appointment.png" className='appointment-img' alt="" />
                        <img src="/image/home/appointment/appoint-sign.png" className='appoint-sign-img' alt="" />
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeAppointment
