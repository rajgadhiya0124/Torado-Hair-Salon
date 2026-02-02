import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import HomeService from '../components/HomeService';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"
import "swiper/css";
import "swiper/css/navigation";
import axios from 'axios';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const ServicePage = () => {
    const navigate = useNavigate();
    const [service,setService] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const fetchService = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/service/getAll");
            setService(res.data.data);

        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }

    useEffect(()=>{
        fetchService();
    },[]);


    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const CurrentService = service.slice(firstIndex,lastIndex);

    const totalPage = Math.ceil(service.length / itemsPerPage);

    const getFirstParagraph = (html) => {
    if (!html) return "";

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const firstP = doc.querySelector("p");

        return firstP ? firstP.textContent : "";
    };

  return (
    <>
    <section className="service-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Our Services</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Our Services</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/service/service-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <HomeService />

    <section className='service-area-section'>
        <section className="containers">
            <div className='serv-head'>
                <div className='serv-head-contnet'>
                    <span className='service-sub'>Services We Provide</span>
                    <h2 className='service-title'>We Are A Place Where You Can Enjoy And Relax</h2>
                </div>
            </div>

            <div className='service-swiper'>
                <Swiper 
                    modules={[Navigation,Autoplay]}
                    navigation
                    loop
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction:false
                    }}
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1200: { slidesPerView: 3 },
                    }}
                >
                    {service.map((item)=>(
                        <SwiperSlide key={item.id}>   
                            <div className='service-swip-card' onClick={()=>navigate(`/service-details/${item.id}`)}>
                                <img src={`http://localhost:4000/uploads/salon-service/${item.service_image}`} className='service-swip-image' alt={item.name} />

                                <div className='service-overlay'>
                                    <h4>{item.service_name}</h4>

                                    <div className='serve-info'>
                                        <p>{getFirstParagraph(item.service_description).slice(0,100)}</p>
                                        <Link to={`/service-details/${item.id}`} className='service-read-btn'>Read More</Link>
                                    </div>
                                </div>  
                            </div>
                        </SwiperSlide>  
                    ))}
            
                </Swiper>
            </div>
        </section>
    </section>

    <section className='service-two-section'>
        <section className="containers">
            <div className='serv-head'>
                <div className='serv-head-contnet'>
                    <span className='service-sub'>Services We Provide</span>
                    <h2 className='service-title'>We Are A Place Where You Can Enjoy And Relax</h2>
                </div>
            </div>

            <div className='service-grid'>
                {CurrentService.map((item)=>(
                <div className='service-card' key={item.id}>
                    <img src={`http://localhost:4000/uploads/salon-service/${item.service_icon}`} alt="" />

                    <h3 onClick={()=>navigate(`/service-details/${item.id}`)}>
                        {item.service_name}
                    </h3>
                    <p>{getFirstParagraph(item.service_description).slice(0,100)}...</p>

                    <Link to={`/service-details/${item.id}`} className='s2-read-more'>Read More</Link>
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

export default ServicePage;
