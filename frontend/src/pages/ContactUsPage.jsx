import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import {toast} from "react-toastify"
import { BsTelephoneFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import HomeNewsletter from '../components/HomeNewsletter';

const ContactUsPage = () => {

    const [contactInfo, setContactInfo] = useState([]);
    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const fetchContatInfo = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/contactInfo/getAll");
            setContactInfo(res.data.data);
        } catch (error) {
            console.error("Error fetching contact info", error);
        }
    }

    useEffect(()=>{
        fetchContatInfo();
    },[]);


    //
    const handleChange = (e)=>{
        setContactForm({
            ...contactForm,
            [e.target.name] : e.target.value, 
        });
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/contactus/create",contactForm);
            toast.success("Form Submittd Successfully")
            setContactForm({ name: "", email: "", phone: "",subject:"" ,message: ""});
        } catch (error) {
            console.error("Error While Form Submit",error);
            toast.error("Error While Submitted Form")
        }
    }
  return (
    <>
    <section className="contactus-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Contact Us</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Contact</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/contactus/contact-baneer.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>
    
    <section>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.686005040604!2d1.2863173761998763!3d52.62951812811606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d9e3e0572397a1%3A0x2a4dbaa99d3b831a!2sThe%20temple%2C%2047%20St%20Giles%20St%2C%20Norwich%20NR2%201JR%2C%20UK!5e0!3m2!1sen!2sin!4v1769490343539!5m2!1sen!2sin" 
            style={{width:"100%", height:"450px" , border:"none"}}
            allowfullscreen="" 
            loading="lazy" referrerpolicy="no-referrer-when-downgrade">
        </iframe>
    </section>


    <section className="contactus-page-section">
        <section className="containers">
            <div className='contact-info-grid'>

                {contactInfo.map((item)=>(
                <div className="contact-info-card" key={item.id}>
                    <div className='ccard-icon'>
                        <BsTelephoneFill />
                    </div>
                    <div className='contact-info'>
                        <h3>{item.title}</h3>
                        <p>{item.value_1}</p>
                        <p>{item.value_2}</p>
                    </div>
                </div>
                ))}

                {/* <div className="contact-info-card">
                    <div className='ccard-icon'>
                        <HiOutlineMail />
                    </div>
                    <div className='contact-info'>
                        <h3>Email Address</h3>
                        <p>hello@torado.com</p>
                        <p>info@torado.com</p>
                    </div>
                </div>

                <div className="contact-info-card">
                    <div className='ccard-icon'>
                        <FaLocationDot />
                    </div>
                    <div className='contact-info'>
                        <h3>Our Location</h3>
                        <p>70-80 Upper St Norwich NR2 London United Kingdom</p>
                    </div>
                </div> */}
            </div>

            <div className='contactus-form-container'>
                <div className='contactform-head'>
                    <span className='contact-sub'>Contact Us</span>
                    <h2 className="contact-form-title">Stay Connected With Torado</h2>
                </div>

                <form className="contactus-form" onSubmit={handleSubmit}>
                    <div className="contactus-form-row">
                        <div className="a-form-group">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={contactForm.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="a-form-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={contactForm.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="contactus-form-row">
                        <div className="a-form-group">
                              <input
                                    type="text"
                                    name="phone"
                                    placeholder="Phone (optional)"
                                    value={contactForm.phone}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="a-form-group">
                            <input 
                                type="text" 
                                name='subject'
                                placeholder="Subject"
                                value={contactForm.subject}
                                onChange={handleChange} 
                            />
                        </div>
                    </div>


                    <div className="a-form-group full-width">
                        <textarea rows="10" 
                            placeholder="Write A Message"
                            name='message'
                            value={contactForm.message}
                            onChange={handleChange}    
                        >
                        </textarea>
                    </div>

                    <div className='message-button'>
                        <button type="submit" className="message-btn">
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    </section>

    <HomeNewsletter />
    </>
  )
}

export default ContactUsPage
