import React, { useEffect, useState } from 'react'
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";
import axios from 'axios';

const HomeTestimonials = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [testimonial,setTestimonial] = useState([]);


    const fetchtestimonial = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/review/getall");
            setTestimonial(res.data.data);
        } catch (error) {
            console.error("Error While fetch Testimonial",error);
        }
    }

    useEffect(()=>{
        fetchtestimonial();
    },[]);


  return (
   <section className='home-testimonials-section'>
        <section className="containers">
            <div className="testmonails-head">
                <span className='testimonials-sub'>Our Testimonials</span>
                <h2 className='testimonials-title'>What Our Clients Feedback</h2>
            </div>

            <div className='testimonials-swiper-section'>
                <div className="testimonail-info">
                    <Swiper
                        modules={[Autoplay,Thumbs]}
                        autoplay={{
                            delay:3000,
                            disableOnInteraction:false
                        }}
                        thumbs={{swiper:thumbsSwiper}}
                        loop
                        className='testimonial-text-swiper'
                    >
                        {testimonial.slice(0,3).map((item)=>(
                            <SwiperSlide key={item.id}>
                                <BiSolidQuoteSingleLeft className='qoutes'/>
                                <BiSolidQuoteSingleLeft className='qoutes' />
                                <p className="testimonial-text">"{item.review_message}"</p>
                                <h4 className="testimonial-name">{item.user_name}</h4>
                                <p>New Customer</p>
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>

                <Swiper
                    onSwiper={setThumbsSwiper}
                    slidesPerView={3}
                    spaceBetween={20}
                    watchSlidesProgress
                    className='testimonial-thumb-swiper'
                >       
                    {testimonial.slice(0,3).map((item)=>(
                        <SwiperSlide key={item.id}>
                            <div className='testimonial-avtar'>
                                {item.user_name?.charAt(0).toUpperCase()}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <img src="/image/home/testimonials/shape1.png" className='t-shap1' alt="" />
            <img src="/image/home/testimonials/shape2.png" className='t-shap2' alt="" />
        </section>
   </section>
  )
}

export default HomeTestimonials
