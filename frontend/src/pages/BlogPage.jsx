import React from 'react'
import { Link } from 'react-router-dom'
import { IoCalendarOutline } from "react-icons/io5";
import { LiaComment } from "react-icons/lia";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import HomeAnimation from '../components/HomeAnimation';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";


const BlogPage = () => {

    const [blog,setBlog] = useState([]);

    const[currentPage , setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const CurrentBlogs = blog.slice(firstIndex,lastIndex);

    const totalPage = Math.ceil(blog.length / itemsPerPage);



    const fetchBlogs  = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/blog/getAll");
            setBlog(res.data.data);
            console.log(res.data)
        } catch (error) {
            console.error("Error Whilr Fetch Blogs",error);
        }
    }

    useEffect(()=>{
        fetchBlogs();
    },[]);

    const formatDate = (date)=>{
        return new Date(date).toLocaleDateString("en-US",{
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    
  return (
    <>
    <section className="blog-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Blog Grid</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Blog</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/blog/blog-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="blog-page-section">
        <section className="containers">
            <div className='blog-head'>
                <span className='blog-sub'>News Feeds</span>
                <h2 className='blog-head-title'>Our Latest Blog Update</h2>
            </div>

            <div className="blog-list-content">
                <div className='blog-grid'>
                    {CurrentBlogs.map((item)=>(
                    <div className="blog-card" key={item.id}>
                        <img src={ `http://localhost:4000/uploads/blog/${item.blog_image}`}  className="blog-image" alt="" />

                        <div className='blog-info-box'>
                            <ul className='date-info-ul'>
                                <li className='date-li'>
                                    <IoCalendarOutline  style={{color:"#FF6F61"}}/>
                                    <p className='m-0'>{formatDate(item.blog_date)}</p>
                                </li>
                                <li className='date-li'>
                                    <LiaComment style={{color:"#FF6F61"}}/>
                                    <p className='m-0'>No Comments</p>
                                </li>
                            </ul>
                            <h4 className='blog-titles'>{item.blog_title}</h4>

                            <p>Lorem ipsum dolor sit amet conectetur adipis elementum erat ut aliquet neque pra.</p>

                            <Link className='read-more-link'>Read More</Link>
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
            </div>
        </section>
    </section>

    <HomeAnimation />
    </>
  )
}

export default BlogPage
