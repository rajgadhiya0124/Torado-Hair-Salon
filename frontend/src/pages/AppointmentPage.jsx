import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';

const AppointmentPage = () => {

    const [appointmentForm ,setAppointmentForm] = useState({
        customer_name:"",
        customer_email:"",
        customer_phone:"",
        persons:"",
        appointment_date:"",
        address:"",
        message:""
    });

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const token = localStorage.getItem("token");

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
                persons:"",appointment_date:"",address:"",message:""
            })
            toast.success("Form Submitted...")
        } catch (error) {
            console.error("Errror while submit form",error);
        }
    }

    //newsletter 
    const handleSubscribe = async()=>{
        if (!email) {
            setMessage("Please enter your email");
            setMessageType("error")
            return;
        }

        try {
            setLoading(true);

            const res = await axios.post("http://localhost:4000/api/newsletter/create",
                { email },
                {
                    headers:{ Authorization: `Bearer ${token}`}
                }
            )
            setMessage(res.data.message || "Subscribed successfully");
            setMessageType("success")
            setEmail("");
        } catch (error) {
            console.error("Error while subscibe newsletter",error);
        }finally{
            setLoading(false)
        }
    }


  return (
    <>
    <section className="appointment-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Make An Appointment</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Appointment</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/appoinment/appoinment-bannner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="appointment-page-section">
        <section className="containers">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <img src="/image/appoinment/appointment-left-img.png"  
                        className="appointment-left-img" 
                        alt="" 
                    />
                </div>

                <div className="col-12 col-lg-6">
                    <div className='appointment-right'>
                        <div>
                            <span className='appoint-subtitle'>For Your Services</span>
                            <h2 className='appointment-title'>Make An Appointment</h2>
                        </div>
                    
                        <form className="appointment-form" onSubmit={handleSubmit}>
                            <div className="appoint-form-row">
                                <div className="form-groups">
                                    <input 
                                        type="text" 
                                        placeholder="Your Name" 
                                        name='customer_name'
                                        value={appointmentForm.customer_name}
                                        onChange={handleChnage}
                                    />
                                </div>
                                <div className="form-groups">
                                    <input 
                                        type="email" 
                                        placeholder="Email Address" 
                                        name='customer_email'
                                        value={appointmentForm.customer_email}
                                        onChange={handleChnage}
                                    />
                                </div>
                            </div>

                            <div className="appoint-form-row">
                                <div className="form-groups">
                                    <input 
                                        type="tel" 
                                        placeholder="Phone Number"
                                        name='customer_phone'
                                        value={appointmentForm.customer_phone}
                                        onChange={handleChnage}
                                    />
                                </div>
                                <div className="form-groups">
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
                                    <input 
                                        type="date" 
                                        name='appointment_date'
                                        value={appointmentForm.appointment_date}
                                        onChange={handleChnage}
                                    />
                                </div>
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

                            <div className="form-groups full-width">
                                <textarea rows="5" 
                                    placeholder="Your Message"
                                    name='message'
                                    value={appointmentForm.message}
                                    onChange={handleChnage}
                                ></textarea>
                            </div>

                            <button type="submit" className="appoint-book-btn">
                                Book Now
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </section>
    </section>

    <section className="appointment-newsletter-section">
        <section className="containers">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <span className='appoint-newsletter-sub'>Newsletter</span>
                    <h2 className='appoint-newsletter-title'>Stay Connected With Us</h2>
                </div>

                <div className='col-12 col-lg-6'>
                    <div className='appoint-news-right'>
                        <input 
                            type="email" 
                            name='email'
                            placeholder='Your email here...'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className='news-email-input'
                        />
                        <button className='new-subscribe-btn' onClick={handleSubscribe}>
                            {loading ? "Subscribing..." : "Subscribe"}
                        </button>
                    </div>

                    {message &&(
                    <p className={`newsletter-message ${messageType}`}>
                        {message}
                    </p>
                )}
                </div>
            </div>
        </section>
    </section>
    </>
  )
}

export default AppointmentPage
