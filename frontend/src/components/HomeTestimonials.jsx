import React, { useState } from 'react'
import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";

const HomeTestimonials = () => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const testimonials = [
    {
        id: 1,
        name: "John Doe",
        role: "Hair Stylist",
        image: "/image/home/testimonials/testimonials-1.png",
        text: "Sed ut perspiciatis unde omnislom iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaque ipsa quae illo inventore verita quasi sed yes architecto beatae vitae dicta sun."
    },
    {
        id: 2,
        name: "Sarah Smith",
        role: "Customer",
        image: "/image/home/testimonials/testimonials-2.png",
        text: "Sed ut perspiciatis unde omnislom iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaque ipsa quae illo inventore verita quasi sed yes architecto beatae vitae dicta sun."
    },
    {
        id: 3,
        name: "David Lee",
        role: "Client",
        image: "/image/home/testimonials/testimonials-3.png",
        text: "Sed ut perspiciatis unde omnislom iste natus error sit voluptatem accusantium doloremque laudantium totam aperiam eaque ipsa quae illo inventore verita quasi sed yes architecto beatae vitae dicta sun."
    }
    ];

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
                        {testimonials.map((item)=>(
                            <SwiperSlide key={item.id}>
                                <BiSolidQuoteSingleLeft className='qoutes'/>
                                <BiSolidQuoteSingleLeft className='qoutes' />
                                <p className="testimonial-text">"{item.text}"</p>
                                <h4 className="testimonial-name">{item.name}</h4>
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
                    {testimonials.map((item)=>(
                        <SwiperSlide key={item.id}>
                            <img src={item.image} alt="" />
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
