import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TermsPage = () => {

    const [terms,setTerms] = useState([]);

    const fetchTerms = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/terms/get");
            setTerms(res.data.data);
        } catch (error) {
            console.error("Error While fetch Terms",error);
        }
    }

    useEffect(()=>{
        fetchTerms();
    },[]);

  return (
    <>
    <section className="terms-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Terms & Conditions</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Terms & Conditions</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/terms/terms-nanner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="terms-page-section">
        <section className="containers">
            <div className='terms-head'>
                <span className='terms-sub'>{terms.sub_title}</span>    
                <h2 className='terms-title'>{terms.title}</h2>
            </div>

            <div className='terms-content-div'>
                <div className='terms-content'
                dangerouslySetInnerHTML={{__html:terms.content}}></div>
            </div>
        </section>
    </section>
    </>
  )
}

export default TermsPage
