import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PiQuotesFill } from "react-icons/pi";
import axios from 'axios';
import RatingStar from '../components/RatingStar';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const TestimonialPage = () => {

    const [testimonial,setTestimonial] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const Currenttestimonial = testimonial.slice(firstIndex,lastIndex);
    const totalPage = Math.ceil(testimonial.length / itemsPerPage )

    //fetch user feddback (from product review form)
    const fetchReview = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/review/getall");
            setTestimonial(res.data.data)
        } catch (error) {
            console.log("Error while fetch Review",error);
        }
    } 

    useEffect(()=>{
        fetchReview();
    },[]);




  return (
    <>
    <section className="testimonial-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Our Testimonials</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Our Testimonials</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/testimonial/testi-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="testimonial-page-section">
        <section className="containers">
            <div className='testimonial-head'>
                <span className='testimonial-sub'>Our Testimonials</span>
                <h2 className='testimonial-title'>What Our Clients Feedback</h2>
            </div>

            <div className='testimonial-grid'>
                {Currenttestimonial.map((item)=>(
                    <div className="testimonial-card">
                        <div className='testi-rating'><RatingStar rating={item.rating}/></div>

                        <p>“{item.review_message}”</p>
                        <div className='client-name-content'>
                            <PiQuotesFill className='testimonial-quote'/>
                            <div>
                                <h4 className='client-name'>{item.user_name}</h4>
                                <p className='job-role'>Customer</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className='pagination'>
                <button
                className='pagination-left-btn'
                    disabled = {currentPage === 1}
                    onClick={()=> setCurrentPage(currentPage - 1)}
                >
                    <MdOutlineKeyboardArrowLeft />
                </button>

                {[...Array(totalPage)].map((_,index)=>(
                    <button
                        key={index}
                        className={`pagination-btn ${currentPage === index + 1 ? "active" : "" }`}
                        onClick={()=>setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                className='pagination-right-btn'
                    disabled = {currentPage === totalPage}
                    onClick={()=>setCurrentPage(currentPage + 1)}
                >
                    <MdOutlineKeyboardArrowRight />
                </button>
            </div>
        </section>
    </section>
    </>
  )
}

export default TestimonialPage
