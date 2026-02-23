import axios from 'axios';
import React from 'react'
import { useState } from 'react';

const HomeNewsletter = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    
    const token = localStorage.getItem("token");

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
            setMessage(error.response.data.message)
            setMessageType("error")
        }finally{
            setLoading(false)
        }
    }

  return (
    <section className="home-newsletter-section">
        <section className="containers">
            <div className="newsletter-head">
                <span className='newsletter-sub'>Newsletter</span>
                <h2 className='newsletter-title'>Let Your Hair Shine With Special Offers And Deals Subscribe</h2>
            </div>

            <div className="newsletter-main-section">
                <input 
                    type="email" 
                    name='email'
                    placeholder='Your email here...'
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='email-input'
                />
                <button className='subscribe-btn' onClick={handleSubscribe}>
                    {loading ? "Subscribing..." : "Subscribe Now"}
                </button>
            </div>

            {message &&(
                <p className={`newsletter-message ${messageType}`}>
                    {message}
                </p>
            )}
    
        </section>
    </section>
  )
}

export default HomeNewsletter
