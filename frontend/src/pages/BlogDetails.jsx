import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'
import { LiaComment } from 'react-icons/lia'
import { Link, useParams } from 'react-router-dom'
import { CiShoppingTag } from "react-icons/ci";
import { TiSocialFacebook } from "react-icons/ti";
import { BiLogoTwitter } from "react-icons/bi";
import { TbBrandPinterest } from "react-icons/tb";
import { toast } from 'react-toastify'

const BlogDetails = () => {

    const { id } = useParams();

    const [blog,setBlog] = useState([]);
    const [blogcomment, setBlogComment] = useState([]);

    const [commentForm, setCommentForm] = useState({
        blog_id: "",
        name: "",
        email: "",
        comment: ""
    });

    const token = localStorage.getItem("token");

    //fetch single blog
    const fetchsingleBlog = async()=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/blog/getById/${id}`);
            setBlog(res.data.data);
        } catch (error) {
            console.log("Error While Fetch single blog",error);
        }
    }

    useEffect(()=>{
        fetchsingleBlog();
    },[id])


    const fetchBlogComment = async()=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/blogComment/getAllComment/${id}`);
            const ActiveComment = res.data.data.filter(
                (item)=> item.status === 1
            )
            setBlogComment(ActiveComment);
        } catch (error) {
            console.log("Error While Fetch blog comment",error);
        }
    }
    useEffect(()=>{
        fetchBlogComment();
    },[id]);

    //comment form
    const handleChange = (e) => {
        setCommentForm({
            ...commentForm,
            [e.target.name]: e.target.value
        });
    };

    const handelSubmit = async(e)=>{
        e.preventDefault();

        try {
            const payload = {
                blog_id: id,
                name: commentForm.name,
                email: commentForm.email,
                comment : commentForm.comment
            }
            const res = await axios.post(
                "http://localhost:4000/api/blogComment/create",payload,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCommentForm({
                blog_id: "",
                name: "",
                email: "",
                comment: ""
            })
            toast.success("Comment posted successfully");
        } catch (error) {
            console.error("Error submitting comment", error);
            alert("Failed to submit comment");
        }
    }


    const formatDate = (date)=>{
        return new Date(date).toLocaleDateString("en-US",{
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const getFirstLetter = (name = "") => {
        if (!name) return "?";
        return name.trim().charAt(0).toUpperCase();
    };

  return (
    <>
    <section className="blog-details-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Blog Details</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Blog Details</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/blog/single-blog-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className=''>
        <section className="containers">
            <div className='blog-details-container'>
                <div>
                    <img src={`http://localhost:4000/uploads/blog/${blog?.blog_image}`} 
                        className='blog-single-img' alt="" />

                    <div className='single-blog-info'>
                        <ul className='date-info-ul'>
                            <li className='date-li'>
                                <IoCalendarOutline  style={{color:"#FF6F61"}}/>
                                <p className='m-0'>{formatDate(blog?.blog_date)}</p>
                                {/* formatDate(item.blog_date) */}
                            </li>
                            <li className='date-li'>
                                <LiaComment style={{color:"#FF6F61"}}/>
                                <p className='m-0'>No Comments</p>
                            </li>
                        </ul>

                        <h3 className='single-blog-title'>{blog?.blog_title}</h3>

                        <div 
                            className='blog-details-content'
                            dangerouslySetInnerHTML={{ __html: blog?.content}}
                        >  
                        </div>

                        <div className='blogdetails-comment-box'>
                            <div className='tag-box'>
                                <CiShoppingTag style={{lineHeight:"0" ,color:"#FF6F61", fontSize:"20px"}} />
                                <div>
                                    <Link className='tag-link'>{blog?.tag_name}</Link>
                                </div>
                            </div>

                            <div className='d-flex align-items-center gap-3'>
                                Share: 
                                <ul className='b-social-ul'>
                                    <li><TiSocialFacebook /></li>
                                    <li><BiLogoTwitter /></li>
                                    <li><TbBrandPinterest /></li>
                                </ul>
                            </div>
                        </div>

                        <div className='author-box'>
                            <div>
                                <img src={`http://localhost:4000/uploads/blog/author/${blog?.author_image}`} 
                                    className="blog-author-image" alt="" />
                            </div>

                            <div>
                                <h4 className='author-name'>{blog?.author_name}</h4>
                                <p style={{whiteSpace:"pre-line"}}>{blog?.author_bio}</p>

                                <ul className='b-social-ul'>
                                    <li><TiSocialFacebook /></li>
                                    <li><BiLogoTwitter /></li>
                                    <li><TbBrandPinterest /></li>
                                </ul>
                            </div>
                        </div>

                        {/* blog comment */}
                        <div className="user-blog-comment">
                            <h2>{blogcomment.length} Comments</h2>

                            {blogcomment.slice(0,3).map((item)=>(
                            <div className="user-comment-box">

                                <div className='blog-avtar'>
                                    {getFirstLetter(item.name)}
                                </div> 

                                <div className='comment-info'>
                                    <h4>{item.name}</h4>
                                    <p>{formatDate(item.createdAt)}</p>

                                    <p>{item.comment}</p>
                                </div>
                            </div>
                            ))}
                        </div>


                        {/* comment form */}
                        <div className='blog-commentform-content'>
                            <h3>Leave A Reply</h3>
                            <p>Your email address will not be published. Required fields are marked</p>

                            <form className='blog-comment-form' onSubmit={handelSubmit}>
                                <div className='blog-comment-row'>
                                    <input 
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={commentForm.name}
                                        onChange={handleChange}
                                        required
                                    />

                                    <input 
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={commentForm.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <textarea
                                    name="comment"
                                    placeholder="Write A Comment"
                                    value={commentForm.comment}
                                    onChange={handleChange}
                                    rows={8}
                                    required
                                />

                                <button type="submit" className="post-btn">
                                    Post Comment
                                </button>
                            </form>
                        </div>
                    </div>
                 </div>

                 
            </div>
           
        </section>
    </section>
    </>
  )
}

export default BlogDetails

