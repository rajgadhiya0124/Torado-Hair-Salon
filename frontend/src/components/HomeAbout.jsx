import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsTelephoneFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

const HomeAbout = () => {
    const navigate = useNavigate();
    const [aboutus,setAaboutUs] = useState([]);

    //fetch about
    const fetchAboutus = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/home/about/get");
            setAaboutUs(res.data.data);
        } catch (error) {
            console.error("Error While fetch aboutus",error);
        }
    }

    useEffect(()=>{
        fetchAboutus();
    },[]);

  return (
    <section className="home-about-section">
        <section className="containers">
            <img src="/image/home/about/about-side.png" className='about-side-img' alt="" />

            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className='about-left'>
                        <img src={`http://localhost:4000/uploads/home/about/${aboutus.about_image}`} className='home-about-img' alt="" />

                        <img src="/image/home/about/about-sign.png" className="about-sign-img" alt="" />
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='about-right'>
                        <span className='about-sub'>{aboutus.sub_title}</span>

                        <h2 className='home-about-title'>{aboutus.main_title}</h2>
                        <p>{aboutus.small_description}</p>

                        <h3 className='home-about-second-title'>{aboutus.second_title}</h3>
                        <p>{aboutus.second_description}</p>

                        <div className='home-aboutcall-info'>
                            <button className='about-btn' onClick={()=>navigate("/aboutus")}>
                                More About Us
                            </button>

                            <div className='about-call-content'>
                                <div className='about-phone-icon'>
                                    <BsTelephoneFill />
                                </div>
                                <div>
                                    <p className='m-0'>Call Us On:</p>
                                    <a className='about-contact-no'>{aboutus.contact_no}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeAbout
