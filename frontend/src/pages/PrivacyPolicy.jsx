import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {

    const [privacy, setPrivacy] = useState([]);

    const fetchPrivacy = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/privacy/get");
            setPrivacy(res.data.data);

        } catch (error) {
            console.error("Error while Fetch Privacy",error);
        }
    }

    useEffect(()=>{
        fetchPrivacy();
    },[]);

  return (
    <>
    <section className="privacy-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Privacy Policy</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Privacy Policy</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/privacy/privacy-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="privacy-page-section">
        <section className="containers">
            <div className='privacy-head'>
                <span className='privacy-sub'>{privacy.sub_title}</span>
                <h2 className='privacy-title'>{privacy.title}</h2>
            </div>

            <div className='privacy-content-container'>
                <div className='privacy-content'
                    dangerouslySetInnerHTML={{__html: privacy.content}}
                ></div>
            </div>
        </section>
    </section>
    </>
  )
}

export default PrivacyPolicy
