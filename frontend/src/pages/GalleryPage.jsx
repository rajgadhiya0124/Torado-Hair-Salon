import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GoArrowDownRight } from 'react-icons/go'
import { Link } from 'react-router-dom'

const GalleryPage = () => {

    const [gallery, setGallery] = useState([]);

    const fetchGallery = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/gallery/getall");
            setGallery(res.data.data);
        } catch (error) {
            console.error("Error Wile FetchGallery Data : ",error)
        }
    }

    useEffect(()=>{
        fetchGallery();
    },[]);

    const leftImages = gallery.slice(0, 4);
    const rightImages = gallery.slice(4, 7);


  
  return (
    <>
    <section className="gallery-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Gallery</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Gallery</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/gallery/gallery-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="gallery-page-section">
        <section className="containers">

            <div className='gallery-head-content'>
                <span className='gallery-sub'>Excellent Work</span>
                <h2 className='gallery-head-title'>Inspirations Gallery</h2>
            </div>

        
            <div className='gallery-grid'>
                {gallery.map((item,index)=>(
                <div className='main-gallery-card' key={index}>
                    <img src={`http://localhost:4000/uploads/gallery/${item.service_image}`} className='main-gallery-img' alt="" />
                    <div className="main-gallery-overlay">
                        <button className="main-gallery-arrow-btn"
                            // onClick={()=>{
                            //     setActiveIndex(0);
                            //     setOpenSlider(true);
                            // }}
                        >
                            <GoArrowDownRight />
                        </button>
                        <p>{item.category_name}</p>
                        <h3>{item.serivce_name}</h3>
                    </div>
                </div>
                ))}
            </div>

        </section>
    </section>
    </>
  )
}

export default GalleryPage
