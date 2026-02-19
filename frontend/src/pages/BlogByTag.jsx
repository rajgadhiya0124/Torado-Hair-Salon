import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5';
import { LiaComment } from 'react-icons/lia';
import { Link, useParams } from 'react-router-dom';
import FormateDate from '../components/FormateDate';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const BlogByTag = () => {

    const { id } = useParams();
    const [blogByTag, setBlogByTag] = useState([]);
    const [tagName, setTagName] = useState("");

    const[currentPage , setCurrentPage] = useState(1);
    const itemsPerPage = 1;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const CurrentBlogs = blogByTag.slice(firstIndex,lastIndex);
    const totalPage = Math.ceil(blogByTag.length / itemsPerPage);

    const fetchBlogByTag = async()=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/blog/getByTag/${id}`);
            setBlogByTag(res.data.data);

            setTagName(res.data.data[0].tag_name);
        } catch (error) {
            console.error("Error fetching blogs by tag",error);
        }
    }

    useEffect(()=>{
        fetchBlogByTag();
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
    <section className="blog-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Blog By Tag</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>
                                {(tagName.length === 0 ? "Tag Blog" : tagName )}
                            </span>
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
                <h2 className='blog-head-title'>{tagName} Blogs</h2>
            </div>


            <div className="blog-list-content">
                <div className='blog-grid'>
                    {CurrentBlogs.length === 0 ? (
                        <h5>No Blogs Found...</h5>
                    ):(
                    CurrentBlogs.map((item)=>(
                    <div className="blog-card" key={item.id}>
                        <img src={ `http://localhost:4000/uploads/blog/${item.blog_image}`}  className="blog-image" alt="" />

                        <div className='blog-info-box'>
                            <ul className='date-info-ul'>
                                <li className='date-li'>
                                    <IoCalendarOutline  style={{color:"#FF6F61"}}/>
                                    <p className='m-0'>{FormateDate(item.blog_date)}</p>
                                </li>
                                <li className='date-li'>
                                    <LiaComment style={{color:"#FF6F61"}}/>
                                    <p className='m-0'>No Comments</p>
                                </li>
                            </ul>
                            
                            <h4 className='blog-titles' onClick={()=>navigate(`/blogdetails/${item.id}`)}>
                                {item.blog_title}
                            </h4>

                            <p>{getFirstParagraph(item.content).substring(0,80)}...</p>

                            <Link to={`/blogdetails/${item.id}`} className='read-more-link'>Read More</Link>
                        </div>

                    </div>
                    ))
                    )}
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
    </>
  )
}

export default BlogByTag
