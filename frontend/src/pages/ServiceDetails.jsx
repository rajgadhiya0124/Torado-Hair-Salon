import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoIosPlay } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

import axios from 'axios';
import { getEmbedVideoUrl } from '../../../backend/src/helper/videoHelper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper,SwiperSlide } from 'swiper/react';

import "swiper/css";
import "swiper/css/navigation";

const ServiceDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [singleService ,setSingleService] = useState([]);
    const [viedoModel,setVideoModel] = useState(false);

    const [allService,setAllService] = useState([]);
    const [topServices, setTopServices] = useState([]);


    //fetch sinfle service
    const fetchSingleService = async()=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/service/getbyId/${id}`)
            setSingleService(res.data.data);

        } catch (error) {
            console.error("Error While Fetch Single Service",error);
        }
    }

    useEffect(()=>{
        fetchSingleService();
    },[id]);


    //fetch all service
    const fetchAllService = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/service/getAll");
            setAllService(res.data.data);

        } catch (error) {
            console.error("Error fetching services:", error);
        }
    }
     useEffect(()=>{
        fetchAllService();
    },[]);

    //fetch Top Service 
    const fetchTopService = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/service/top-services");
            setTopServices(res.data.data)
        } catch (error) {
            console.error("Error While Fetch Top Service",error)
        }
    }
    useEffect(()=>{
        fetchTopService();
    },[]);

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
                        <h2>Services Details</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Services Details</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/service/service-details-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className='service-deetails-section'>
        <section className="containers">
            <div className="row">
                <div className="col-12 col-lg-4">
                    <div className='service-left-content'>
                        <div className='service-list'>
                            {allService.slice(0,5).map((item)=>(
                                <div className='service-list-card' key={item.id} 
                                    onClick={()=>navigate(`/service-details/${item.id}`)}
                                >
                                    {item.service_name} <MdOutlineKeyboardArrowRight />
                                </div>
                            ))}
                            
                        </div>

                        <div className='brochure-div'>
                            <h3 className='brochure-title'>Our Brochure</h3>

                            <p>Slienum phaedrum torquatos nec eu vis detra peri culis ex nihil is in mei. Mei an pericula hincar tem ei est Alienum phae.</p>
                            <button className='pdf-btn'>Download PDF Now</button>
                        </div>

                        <div className='top-service-div'>
                            <h3 className='topservice-title'>Top Services</h3>

                            {topServices.map((item)=>(
                                <ul className='top-service-ul' key={item.id}>
                                    <li 
                                        onClick={()=>navigate(`/service-details/${item.id}`)} 
                                        className='top-service-li'>
                                            {item.service_name}
                                    </li>
                                </ul>   
                            ))}
                    
                        </div>

                    </div>
                </div>

                <div className="col-12 col-lg-8">
                    <div className='service-right-content'>
                        <img src={`http://localhost:4000/uploads/salon-service/${singleService?.service_image}`}
                            className='singal-service-img' 
                            alt={singleService?.service_name} 
                        />

                        <h2 className='s-service-name'>{singleService?.service_name}</h2>

                        <div  className='service-content'
                            dangerouslySetInnerHTML={{__html: singleService?.service_description}}
                        ></div>

                        <div className='video-banner'
                            style={{
                                backgroundImage : `url(http://localhost:4000/uploads/salon-service/${singleService?.service_video_bg})`
                            }}>

                            <button className="play-btn" onClick={() => setVideoModel(true)}>
                                <IoIosPlay />
                            </button>
                        </div>

                        {viedoModel && (
                        <div className="video-modal">
                            <div className="video-modal-content">

                                <div className='close-button'>
                                    <button className="close-btn" onClick={() => setVideoModel(false)}>
                                        <RxCross2 />
                                    </button>
                                </div>

                                <iframe
                                    width="100%"
                                    height="450"
                                    src={getEmbedVideoUrl(singleService?.service_video)}
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                />

                            </div>
                        </div>    
                        )}
                    </div>
                </div>
            </div>
        </section>
    </section>

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
                    {allService.map((item)=>(
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
    </>
  )
}

export default ServiceDetails
