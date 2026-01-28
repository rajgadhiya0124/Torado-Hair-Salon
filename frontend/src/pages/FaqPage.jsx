import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LuCirclePlus } from "react-icons/lu";
import { LuCircleMinus } from "react-icons/lu";
import axios from 'axios';
import HomeAnimation from '../components/HomeAnimation';

const FaqPage = () => {

    const [faq,setFaq] = useState([]);

    const fetchFaq = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/faq/getall");
            setFaq(res.data.data);
        } catch (error) {
            console.error("Error while fetch Faq",error);
        }
    }

    useEffect(()=>{
        fetchFaq();
    },[]);

    const [activeIndex, setActiveIndex] = useState(null);

    const toogleFAQ = (index)=>{
        setActiveIndex(activeIndex === index ? null : index);
    }

  return (
    <>
    <section className="faq-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Check Question</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>FAQ</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/faq/faq-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="faq-page-section">
        <section className="containers">
            <div className='faq-head'>
                <div>
                    <span className='faq-sub'>Faq</span>
                    <h2 className='faq-title'>Need To Ask Some Question Or Check Question</h2>
                </div>

            </div>

            <div className='faq-content'>
                {faq.map((faq ,index)=>(
                    <div className='faq-item-box'  key={index}>
                        <div className='faq-question' onClick={()=>toogleFAQ(index)}>

                            <span className='plus-icon'>{activeIndex === index ? <LuCircleMinus /> : <LuCirclePlus/>}</span>
                            <h4>{faq.question}</h4>
                        </div>

                        {activeIndex === index &&(
                            <div className='faq-answer'>
                                <p>{faq.answer}</p>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
        </section>
    </section>

    <HomeAnimation />
    </>
  )
}

export default FaqPage
