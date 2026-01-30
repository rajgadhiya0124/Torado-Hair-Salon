import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import { LiaComment } from 'react-icons/lia'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { RiSearchLine } from "react-icons/ri";

import { Link } from 'react-router-dom'

const BlogLeft = () => {
    const [blog,setBlog] = useState([]);
    const [blogcategory , setBlogcategory] = useState([]);
    const [blogtag , setBlogtag] = useState([]);

    const [search ,setSearch] = useState("");

    const[currentPage , setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const CurrentBlogs = blog.slice(firstIndex,lastIndex);
    const totalPage = Math.ceil(blog.length / itemsPerPage);

    const filterBlog = CurrentBlogs.filter((blog)=>
        blog.blog_title.toLowerCase().includes(search.toLowerCase())
    );


    //fetch blog
    const fetchBlogs  = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/blog/getAll");
            setBlog(res.data.data);
            console.log(res.data)
        } catch (error) {
            console.error("Error While Fetch Blogs",error);
        }
    }

    //fetch blog category
    const fetchblogCategory = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/blogCategory/getall");
            setBlogcategory(res.data.data);
            
        } catch (error) {
            console.error("Error While Fetch Blogs Category",error);
        }
    }

    //fetch blog tag
    const fetchblogTag = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/blogTag/getall");
            setBlogtag(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Blogs Tag",error);
        }
    }

    useEffect(()=>{
        fetchBlogs();
        fetchblogCategory();
        fetchblogTag();
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
        <section className="blogright-hero-section">
            <section className="containers">
                <div className='row align-items-center'>
                    
                    <div className="col-12 col-lg-6">
                        <div className='page-hero-left'>
                            <h2>Blog Left Sidebar</h2>
                            <div className='home-navigation'>
                                <Link to={'/'} className='home-link'>Home</Link>  /   
                                <span className='pages-title'>Left Sidebar</span>
                            </div>
                        </div>
                    </div>
    
                    <div className="col-12 col-lg-6">
                        <div className='page-hero-right'>
                            <img src="/image/blog/blog-right-banner.png" className='hero-page-img' alt="" /> 
                        </div>
                    </div>
                </div>
                <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
                <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
            </section>
        </section>
    
        <section className="blogright-page-section">
            <section className="containers">
                <div className='blogright-head'>
                    <span className='r-blog-sub'>News Feeds</span>
                    <h2 className='r-blog-head-title'>Our Latest Blog Update</h2>
                </div>
    
                <div className='right-blog-content'>
                <div className="row">
    
                    <div className="col-lg-4">
                        <div className='blog-search-div'>
                            <input 
                                type="text" 
                                placeholder='search'
                                className='blog-search-input'
                                value={search}
                                onChange={(e)=>setSearch(e.target.value)}
                            />
                            <div className='b-search'>
                                <RiSearchLine  />
                            </div>
                        </div>
    
                        <div className='popoular-blog-div'>
                            <h3 className='pop-blog-title'>Popular Blog</h3>
    
                            <div className='pop-blog-box'>
                                <img src="/image/blog/blog/blog-1.jpg" className='pop-blog-img' alt="" />
                                <div className='pop-blog-info'>
                                    <span>08 Oct 2025</span>
                                    <h4>How To Get Smooth And Long Hair</h4>
                                </div>
                            </div>
                        </div>
    
                        <div className="blog-category-div">
                            <h3 className='category-title'>Categories</h3>
                            
                            {blogcategory.map((cat)=>(
                                <ul className='blog-category-ul' key={cat.id}>
                                    <li className='cate-li'>{cat.category_name}</li>
                                </ul>
                            ))}
                        </div>
    
                        <div className="blog-tag-div">
                            <h3 className='blog-tag-title'>Tags</h3>
                            
    
                            <div className='blog-tag-box'>
                                {blogtag.map((tag)=>(
                                    <span>{tag.tag_name}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <div className='blog-right-grid'>
                        {filterBlog.map((item)=>(
                            <div className="r-blog-card" key={item.id}>
                                <div>
                                    <img src={ `http://localhost:4000/uploads/blog/${item.blog_image}`}  
                                        className="r-blog-image" alt="" />
                                </div>
    
                                <div className='r-blog-info-box'>
                                    <ul className='r-date-info-ul'>
                                        <li className='r-date-li'>
                                            <IoCalendarOutline  style={{color:"#FF6F61"}}/>
                                            <p className='m-0'>{formatDate(item.blog_date)}</p>
                                        </li>
                                        <li className='r-date-li'>
                                            <LiaComment style={{color:"#FF6F61"}}/>
                                            <p className='m-0'>No Comments</p>
                                        </li>
                                    </ul>
                                    <h4 className='r-blog-titles'>{item.blog_title}</h4>
    
                                    <p>Lorem ipsum dolor sit amet conectetur adipis elementum erat ut aliquet neque pra.</p>
    
                                    <Link className='read-link'>Read More</Link>
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
                </div>
                </div>
            </section>
        </section>
    </>
  )
}

export default BlogLeft
