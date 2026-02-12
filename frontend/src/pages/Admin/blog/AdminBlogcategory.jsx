import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { TiArrowSync } from "react-icons/ti";
import { toast } from 'react-toastify';

const AdminBlogcategory = () => {

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category_name: "",
        category_slug: "",
    });

    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({ 
        id: "", 
        category_name: "",
        category_slug: ""
    });
    
    const token = localStorage.getItem("token");

    // Fetch all categories
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/blogCategory/getall");
            setCategories(res.data.data);
        } catch (error) {
            console.error("Error While Get Blog Category",error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //create category
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/blogCategory/create",formData,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            toast.success("Blog Category Created..")
            setFormData({category_name:"",category_slug:""});
            fetchCategories();
        } catch (error) {
            console.error("Error While Create Blog category",error);
        }
    };

    // Open Edit Modal
    const openEditModal = (cat) => {
        setEditData(cat)
        setEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:4000/api/blogCategory/update/${editData.id}`,
                { 
                    category_name: editData.category_name,
                    category_slug: editData.category_slug
                },
                {headers:{
                    Authorization: `Bearer ${token}`
                }}
            );
            setEditModal(false);
            fetchCategories();
        } catch (error) {
            console.error("Error While Update blog category",error);
        }
    };

    //update status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/blogCategory/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchCategories();
        } catch (error) {
            console.error("Error while change status",error);
        }
    };

    //delete
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/blogCategory/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchCategories();
        } catch (error) {
            console.error("Error while delete category",error);
        }
    }
  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Blog Category Managment</h2>
        </div>

        <div className='admin-blog-category-cotent'>
            <h3>Add New Category</h3>

            <form onSubmit={handleCreate} className="category-form">
                <input
                    type="text"
                    name="category_name"
                    placeholder="Category Name"
                    value={formData.category_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="category_slug"
                    placeholder="Category Slug"
                    value={formData.category_slug}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className='add-category-btn'>Add Category</button>

            </form>
        </div>

        <div className='admin-blogcategory-table-content'>
            <h2>Category List</h2>
            <table className="admin-blogcategory-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category Name</th>
                        <th>Category Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {categories.map((cat, index) => (
                    <tr key={cat.id}>
                    <td>{index + 1}</td>
                    <td>{cat.category_name}</td>
                    <td>{cat.category_slug}</td>
                    <td>
                      <span className={`admin-badge ${cat.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                          {cat.status === 1 ? "Active" : "Inactive"}
                      </span>

                      <label className="switch">
                            <span className="status-toggle-icon"
                                    onClick={() => handleStatusChange(cat.id)}>
                                <TiArrowSync />
                            </span>
                        </label>
                    </td>

                    <td>
                        <div className='admin-action-button'>
                            <button
                                className="admin-edit-btn"
                                onClick={() =>openEditModal(cat)}
                            >
                                <IoPencil />
                            </button>
                            <button className='admin-delete-btn' onClick={() => handleDelete(cat.id)}>
                                <BiSolidTrashAlt  />
                            </button>
                        </div>
                    </td>
                </tr>
                ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            {editModal && (
                <div className="bcategory-edit-modal-overlay">
                    <div className="blogcategory-edit-modal">
                        <h3 className='edit-model-h3'>Edit Category</h3>
                        <form className='bcategory-edit-form' onSubmit={handleUpdate}>

                            <label htmlFor="">Category Name</label>
                            <input
                                type="text"
                                value={editData.category_name}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        category_name: e.target.value,
                                    })
                                }
                            />
                            
                            <label htmlFor="">category Slug</label>
                            <input
                                type="text"
                                value={editData.category_slug}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        category_slug: e.target.value,
                                    })
                                }
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


        </div>


    </>
  )
}

export default AdminBlogcategory
