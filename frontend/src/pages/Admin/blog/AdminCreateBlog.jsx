import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"

const AdminCreateBlog = () => {

     const [formData, setFormData] = useState({
        category_id: "",
        tag_id: "",
        author_id: "",
        blog_title: "",
        blog_date: "",
        content: "",
        blog_image: null
    });

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [authors, setAuthors] = useState([]);

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

    useEffect(() => {
        fetchCategories();
        fetchTags();
        fetchAuthors();
    }, []);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    const handleImageChange = (e)=>{
        setFormData({
            ...formData,
            blog_image: e.target.files[0]
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("category_id", formData.category_id);
        data.append("tag_id", formData.tag_id);
        data.append("author_id", formData.author_id);
        data.append("blog_title", formData.blog_title);
        data.append("blog_date", formData.blog_date);
        data.append("content", formData.content);
        data.append("blog_image", formData.blog_image);

        try {
        await axios.post("http://localhost:4000/api/blog/create", data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });

        setFormData(null)
        toast.success("Blog Created Successfully");
        } catch (error) {
            console.error("Error creating blog", error);
        }
    };

  return (
    <>
    <div className=''>
        <div className="admin-create-blog-content">
            <h2>Create Blog</h2>

            <form onSubmit={handleSubmit} className="blog-create-form">

                <input
                    type="text"
                    name="blog_title"
                    placeholder="Blog Title"
                    onChange={handleChange}
                    required
                />

                {/* Image */}
                <input
                    type="file"
                    name="blog_image"
                    onChange={handleImageChange}
                    accept="image/*"
                    required
                />
                {formData.blog_image && (
                <img
                    src={URL.createObjectURL(formData.blog_image)}
                    style={{
                        width:"150px",
                        borderRadius:"8px"
                    }}
                    alt="preview"
                />
                )}

                <input
                    type="date"
                    name="blog_date"
                    onChange={handleChange}
                    required
                />

                {/* Category */}
                <select name="category_id" onChange={handleChange} required>
                <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                        </option>
                    ))}
                </select>

                {/* Tag */}
                <select name="tag_id" onChange={handleChange} required>
                <option value="">Select Tag</option>
                    {tags.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                        {tag.tag_name}
                        </option>
                    ))}
                </select>

                {/* Author */}
                <select name="author_id" onChange={handleChange} required>
                <option value="">Select Author</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                        {author.author_name}
                        </option>
                    ))}
                </select>

                <textarea
                    name="content"
                    placeholder="Blog Content"
                    rows="10"
                    onChange={handleChange}
                    required
                />

                <button type="submit" className="create-blog-btn">
                    Create Blog
                </button>

            </form>
            </div>
        </div>
    </>
  )
}

export default AdminCreateBlog
