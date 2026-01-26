import React, { useState } from 'react'
import { GoArrowDownRight } from "react-icons/go";
import {Swiper , SwiperSlide} from "swiper/react";
import {Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const HomeGallery = () => {

    const images = [
        "/image/home/gallery/gallery-1.jpg",
        "/image/home/gallery/gallery-2.jpg",
        "/image/home/gallery/gallery-3.jpg",
        "/image/home/gallery/gallery-4.jpg",
        "/image/home/gallery/gallery-5.jpg",
    ];

    const [openSlider, setOpenSlider] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="home-gallery-section">
        <section className="containers">
            <div className="home-gallery-head">
                <span className='gallery-sub'>Excellent Work</span>
                <h2 className='gallery-title'>Inspirations Gallery</h2>
            </div>

            <div className="gallery-main-section">
                <div className="row">
                    <div className="col-12 col-lg-6">
                        <div className='gallery-card'>
                            <img src="/image/home/gallery/gallery-1.jpg" className='gallery-img' alt="" />
                            <div className="gallery-overlay">
                                <button className="gallery-arrow-btn"
                                    onClick={()=>{
                                        setActiveIndex(0);
                                        setOpenSlider(true);
                                    }}
                                >
                                        <GoArrowDownRight />
                                </button>
                                <p>Shampoos</p>
                                <h3>Hair Styling Mousse</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-sm-6">
                                <div className='gallery-card'>
                                    <img src="/image/home/gallery/gallery-2.jpg" className='gallery-img' alt="" />
                                    <div className="gallery-overlay">
                                       <button className="gallery-arrow-btn"
                                        onClick={()=>{
                                            setActiveIndex(0);
                                            setOpenSlider(true);
                                        }}
                                        >
                                            <GoArrowDownRight />
                                        </button>
                                        <p>Shampoos</p>
                                        <h3>Hair Styling Mousse</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6">
                                <div className='gallery-card'>
                                    <img src="/image/home/gallery/gallery-3.jpg"  className='gallery-img' alt="" />
                                    <div className="gallery-overlay">
                                        <button className="gallery-arrow-btn"
                                            onClick={()=>{
                                                setActiveIndex(0);
                                                setOpenSlider(true);
                                            }}
                                        >
                                                <GoArrowDownRight />
                                        </button>
                                        <p>Shampoos</p>
                                        <h3>Hair Styling Mousse</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-6">
                        <div className='gallery-card'>
                            <img src="/image/home/gallery/gallery-4.jpg" className='gallery-img' alt="" />
                            <div className="gallery-overlay">
                                <button className="gallery-arrow-btn"
                                    onClick={()=>{
                                        setActiveIndex(0);
                                        setOpenSlider(true);
                                    }}
                                >
                                    <GoArrowDownRight />
                                </button>
                                <p>Shampoos</p>
                                <h3>Hair Styling Mousse</h3>
                            </div>
                        </div>
                        <div className='gallery-card'>
                            <img src="/image/home/gallery/gallery-5.jpg" className='gallery-img' alt="" />
                            <div className="gallery-overlay">
                                <button className="gallery-arrow-btn"
                                    onClick={()=>{
                                        setActiveIndex(0);
                                        setOpenSlider(true);
                                    }}
                                >
                                    <GoArrowDownRight />
                                </button>
                                <p>Shampoos</p>
                                <h3>Hair Styling Mousse</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {openSlider && (
                <div className='gallery-modal'>
                    <div className='gallery-modal-overlay'>
                        <div className='gallery-modal-content'>
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                loop
                                initialSlide={activeIndex}
                                spaceBetween={20}
                                slidesPerView={1}
                            >
                                {images.map((img,index)=>(
                                    <SwiperSlide key={index}>
                                        <img src={img} className='gallery-swiper-img' alt="" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                             <button className="close-btn" onClick={() => setOpenSlider(false)}>✕</button>
                        </div>
                    </div>
                </div>
            
            )}
        </section>
    </section>
  )
}

export default HomeGallery
