import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HomeAbout from '../components/HomeAbout';
import HomeService from '../components/HomeService';
import HomeAppointment from '../components/HomeAppointment';
import HomePartner from '../components/HomePartner';
import HomeTestimonials from '../components/HomeTestimonials';
import HomeTeam from '../components/HomeTeam';
import HomeAnimation from '../components/HomeAnimation';
import { toast } from 'react-toastify';

const AboutusPage = () => {
    const [leadForm , setLeadForm] = useState({
        user_name:"",
        email:"",
        company: ""
    });

    //lead form
    const handleChange = (e) => {
        setLeadForm({
            ...leadForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/leadform/create",leadForm,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                setLeadForm({ user_name: "", email: "", company: "" });
            }

        } catch (error) {
            console.error("Erroe While Submit lead form",error);
        }
    }
  return (
    <>
    <section className="about-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Know About Us</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>About Us</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/about/about-banner1.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className='lead-section'>
        <section className="containers">
            <form className='lead-form' onSubmit={handleSubmit}>
             
                <input 
                    type="text" 
                    className="lead-form-input"
                    placeholder='Name'
                    name="user_name"
                    value={leadForm.user_name}
                    onChange={handleChange}
                />
              
                <input 
                    type="email" 
                    className="lead-form-input"
                    placeholder='Email'
                    name="email"
                    value={leadForm.email}
                    onChange={handleChange}
                />
        
                <input 
                    type="text" 
                    className="lead-form-input"
                    placeholder='Company'
                    name="company"
                    value={leadForm.company}
                    onChange={handleChange}
                />
              
              <button type="submit" className='send-btn'>Send</button>
            </form>
        </section>
    </section>


    <HomeAbout />
    <HomeAppointment />
    <HomePartner />
    <HomeTestimonials />
    <HomeTeam />
    <HomeAnimation />

    </>
  )
}

export default AboutusPage
