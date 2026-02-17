import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate } from "react-router-dom"
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoClose } from "react-icons/io5";
import FormateDate from '../../../components/FormateDate';
import { TiArrowSync } from 'react-icons/ti';

const AdminBlog = () => {

    const navigate = useNavigate();
    const [blog,setBlog] = useState([]);

    const[editModal, setEditModal] = useState(false);
    const [editData ,setEditData] = useState({
        id:"",
        category_id: "",
        tag_id: "",
        author_id: "",
        blog_title: "",
        blog_date: "",
        content: "",
        blog_image: null
    })

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [authors, setAuthors] = useState([]);

    const [showCommentModal, setShowCommentModal] = useState(false); //for comment 
    const [comments, setComments] = useState([]);
    const [currentBlogId, setCurrentBlogId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentBlog = blog.slice(firstIndex,lastIndex);
    const totalPages = Math.ceil(blog.length / itemsPerPage)

    const token = localStorage.getItem("token");

     //fetch blog category
    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:4000/api/blogCategory/getall");
        const activecategory = res.data.data.filter(
            (item)=>item.status === 1
        )
        setCategories(activecategory);
    };

    //fetch blog tag
    const fetchTags = async () => {
        const res = await axios.get("http://localhost:4000/api/blogTag/getall");
        const activeTag = res.data.data.filter(
            (item)=> item.status === 1
        )
        setTags(activeTag);
    };

    //fetch author
    const fetchAuthors = async () => {
        const res = await axios.get("http://localhost:4000/api/blog/author/getall");
        const activeAuthor = res.data.data.filter(
            (item)=> item.status === 1
        )
        setAuthors(activeAuthor);
    };

    //fetch all blogs
    const fetchBlogs = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/blog/getAll");
            setBlog(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Blogs",error);
        }
    }

    useEffect(()=>{
        fetchCategories();
        fetchTags();
        fetchAuthors();
        fetchBlogs();
    },[]);

    const openEditModal = (item) => {
        setEditData({
            id: item.id,
            category_id: item.category_id,
            tag_id: item.tag_id,
            author_id: item.author_id,
            blog_title: item.blog_title,
            blog_date: item.blog_date,
            content: item.content,
            blog_image: item.blog_image
        });
        setEditModal(true);
    };

    const handleEditChange = (e)=>{
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e)=>{
        setEditData({
            ...editData,
            blog_image: e.target.files[0]
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = new FormData();
        
        data.append("category_id", editData.category_id);
        data.append("tag_id", editData.tag_id);
        data.append("author_id", editData.author_id);
        data.append("blog_title", editData.blog_title);
        data.append("blog_date", editData.blog_date);
        data.append("content", editData.content);

        if (editData.blog_image instanceof File) {
            data.append("blog_image", editData.blog_image);
        }

        try {
            await axios.put(`http://localhost:4000/api/blog/update/${editData.id}`,data,
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data" 
                    } 
                }
                );

                fetchBlogs();
                setEditModal(false);
            } catch (error) {
                console.error("Update error", error);
            }
        };


    //update blog status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/blog/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchBlogs();
        } catch (error) {
            console.error("Error while change Blog status",error);
        }
    };

    //delete blog
    const handleDelete = async(id)=>{
        try {
            await axios.delete(`http://localhost:4000/api/blog/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchBlogs();
        } catch (error) {
            console.error("Error Delete blog", error);
        }
    }

    //Blog comment 
    const handleOpenComments = async (blogId) => {
        try {
            setCurrentBlogId(blogId);
            
            const res = await axios.get(`http://localhost:4000/api/blogComment/getAllComment/${blogId}`);
            setComments(res.data.data);
            setShowCommentModal(true);
        } catch (error) {
            console.error("Error fetching comments", error);
        }
    };

    const handleDeleteComment = async (id) => {
        if(!window.confirm("Wre You Sure To Delete")) return;
        try {
            await axios.delete(`http://localhost:4000/api/blogComment/delete/${id}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            handleOpenComments(currentBlogId);
        } catch (error) {
            console.error("Delete comment error", error);
        }
    };

  return (
    <>
    <div className='admin-page-title-content'>
        <h2 className='admin-page-title'>Blogs Managment</h2>
    </div>

    <div className="admin-add-btn-wrapper">
        <button
          className="admin-add-btn"
          onClick={() =>navigate("/admin/blog/create")}
        >
          + Add New Blog
        </button>
      </div>

    <div className='admin-blog-table-content'>
        <table className="admin-blog-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Blog Review</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {currentBlog.map((item,index) => (
                <tr key={item.id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>
                        <img src={`http://localhost:4000/uploads/blog/${item.blog_image}`} 
                            className='admin-blog-img'
                        />
                    </td>
                    <td>{item.blog_title}</td>
                    <td>{item.author_name}</td>
                    <td>{FormateDate(item.blog_date)}</td>

                    <td>
                        <span className={`admin-badge ${item.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                            {item.status === 1 ? "Active" : "Inactive"}
                        </span>

                        <label className="switch">
                            <span className="status-toggle-icon"
                                    onClick={() => handleStatusChange(item.id)}>
                                <TiArrowSync />
                            </span>
                        </label>
                    </td>

                    <td>
                        <button onClick={() => handleOpenComments(item.id)} className='blog-review-btn'>
                            Review
                        </button>
                    </td>

                    <td>
                        <div className='admin-action-button'>
                            {/* <button className='admin-view-btn'
                                onClick={()=>handleView(item)}
                            >
                                <MdOutlineRemoveRedEye />
                            </button> */}
                            <button
                                className="admin-edit-btn"
                                onClick={() =>openEditModal(item)}
                            >
                                <IoPencil />
                            </button>
                            <button className='admin-delete-btn' onClick={() => handleDelete(item.id)}>
                                <BiSolidTrashAlt  />
                            </button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>

        <div className="pagination-wrapper">
            <button 
                className='admin-pagination-left-btn'
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                <MdOutlineKeyboardArrowLeft />
            </button>

            {[...Array(totalPages)].map((_,index)=>(
                <button
                    key={index}
                    className={`admin-pagination-btn ${currentPage === index + 1 ? "active-page" : ""}`}
                    onClick={()=>setCurrentPage(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            <button 
                className='admin-pagination-right-btn'
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                <MdOutlineKeyboardArrowRight />
            </button>
        </div>
    </div>

    {/* update Modal */}
    {editModal && editData && (
        <div className="admin-blog-update-overlay">
            <div className="admin-blog-update-modal">
        
                <h3>Update Blog</h3>

                <form onSubmit={handleUpdate} className="blog-update-form">

                    <label>Blog Title</label>
                    <input
                        type="text"
                        name="blog_title"
                        value={editData.blog_title || ""}
                        onChange={handleEditChange}
                        placeholder="Blog Title"
                    />

                    <label>Blog Image</label>
                    <input
                        type="file"
                        name="blog_image"
                        onChange={handleImageChange}
                    />

                    {/* Show current image */}
                    {typeof editData.blog_image === "string" && (
                    <img
                        src={`http://localhost:4000/uploads/blog/${editData.blog_image}`}
                        alt="Blog"
                        style={{
                            width:"200px",
                            borderRadius:"8px"
                        }}
                        className="preview-image"
                    />
                    )}

                    <label>Blog Date</label>
                    <input
                        type="date"
                        name="blog_date"
                        value={editData.blog_date || ""}
                        onChange={handleEditChange}
                    />
                    
                    <label>Blog Category</label>
                    <select
                        name="category_id"
                        value={editData.category_id || ""}
                        onChange={handleEditChange}
                    >
                    <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.category_name}
                            </option>
                        ))}
                    </select>
                    
                    <label>Blog Tag</label>
                    <select
                        name="tag_id"
                        value={editData.tag_id || ""}
                        onChange={handleEditChange}
                    >
                    <option value="">Select Tag</option>
                        {tags.map((tag) => (
                            <option key={tag.id} value={tag.id}>
                            {tag.tag_name}
                            </option>
                        ))}
                    </select>
                    
                    <label>Blog Author</label>
                    <select
                        name="author_id"
                        value={editData.author_id || ""}
                        onChange={handleEditChange}
                    >
                    <option value="">Select Author</option>
                        {authors.map((author) => (
                            <option key={author.id} value={author.id}>
                                {author.author_name}
                            </option>
                        ))}
                    </select>

                    <label>Blog Content</label>
                    <textarea
                        name="content"
                        value={editData.content || ""}
                        onChange={handleEditChange}
                        placeholder="Blog Content"
                        rows="10"
                    />

                    <div className="update-model-action">
                        <button type="submit" className='admin-update-btn'>
                            Update
                        </button>

                        <button
                            type="button"
                            className="admin-cancel-btn"
                            onClick={() => setEditModal(false)}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
        )}

        {/* comment review modal */}
        {showCommentModal && (
            <div className="review-modal-overlay">
                <div className="review-modal">

                <h3>Blog Comments</h3>

                <div className="comment-list">

                    {comments.length === 0 ? (
                        <p>No comments found.</p>
                    ) : (
                    comments.map((comment) => (
                        <div key={comment.id} className="comment-card">
                        
                        <div className="comment-top">
                            <strong>{comment.name}</strong>
                            <span style={{fontWeight:"600"}}>{comment.email}</span>
                        </div>

                        <p className="comment-message">
                            {comment.comment}
                        </p>

                        <div className="comment-footer">
                            <span>
                                {comment.createdAt?.split("T")[0]}
                            </span>

                            <button
                                className="delete-btn"
                                onClick={() => handleDeleteComment(comment.id)}
                            >
                                Delete
                            </button>
                        </div>

                        </div>
                    ))
                    )}

                </div>

                <div className='view-modal-action'>
                    <button className='admin-close-btn' onClick={()=>setShowCommentModal(false)}>
                        Close
                    </button>
                </div>

                </div>
            </div>
        )}
    </>
  )
}

export default AdminBlog
