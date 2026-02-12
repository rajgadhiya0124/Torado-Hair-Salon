import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { TiArrowSync } from 'react-icons/ti';
import { toast } from 'react-toastify';

const AdminBlogTag = () => {

    const [blogTag, setBlogtag] = useState([]);
    const [formData, setFormData] = useState({
        tag_name: "",
        tag_slug: "",
    });
    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({ 
        id: "", 
        tag_name: "",
        tag_slug: ""
    });

    const token = localStorage.getItem("token");

    // Fetch all Tag
    const fetchtag = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/blogTag/getall");
            setBlogtag(res.data.data);
        } catch (error) {
            console.error("Error While Get Blog Category",error);
        }
    };

    useEffect(()=>{
        fetchtag();
    },[]);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    //create Tag
    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/blogTag/create",formData,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            toast.success("Blog Tag Created..")
            setFormData({tag_name:"",tag_slug:""});
            fetchtag();
        } catch (error) {
            console.error("Error While Create Blog Tag",error);
        }
    };


    // Open Edit Modal
    const openEditModal = (item) => {
        setEditData(item)
        setEditModal(true);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:4000/api/blogTag/update/${editData.id}`,
                { 
                    tag_name: editData.tag_name,
                    tag_slug: editData.tag_slug
                },
                {headers:{
                    Authorization: `Bearer ${token}`
                }}
            );
            setEditModal(false);
            fetchtag();
        } catch (error) {
            console.error("Error While Update blog tag",error);
        }
    };


    //update status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/blogtag/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchtag();
        } catch (error) {
            console.error("Error while change Tag status",error);
        }
    };


    //delete Tag
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/blogTag/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchtag();
        } catch (error) {
            console.error("Error while delete Tag",error);
        }
    }

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Blog Tag Managment</h2>
        </div>

        <div className='admin-blog-tag-cotent'>
            <h3>Add New Tag</h3>

            <form onSubmit={handleCreate} className="tag-form">
                <input
                    type="text"
                    name="tag_name"
                    placeholder="Tag Name"
                    value={formData.tag_name}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="tag_slug"
                    placeholder="Tag Slug"
                    value={formData.tag_slug}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className='add-tag-btn'>Add Category</button>
            </form>
        </div>

        <div className='admin-blogtag-table-content'>
            <h2>Tag List</h2>

            <table className="admin-blogtag-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tag Name</th>
                        <th>Tag Slug</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {blogTag.map((item, index) => (
                    <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.tag_name}</td>
                    <td>{item.tag_slug}</td>
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
                        <div className='admin-action-button'>
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

            {/* Edit Modal */}
            {editModal && (
                <div className="blogtag-edit-modal-overlay">
                    <div className="blogtag-edit-modal">
                        <h3 className='edit-model-h3'>Edit Category</h3>
                        <form className='blogtag-edit-form' onSubmit={handleUpdate}>
                            <div>
                                <label htmlFor="">Tag Name</label>
                                <input
                                    type="text"
                                    value={editData.tag_name}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            tag_name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                                    
                            <div>
                                <label htmlFor="">Tag Slug</label>
                                <input
                                    type="text"
                                    value={editData.tag_slug}
                                    onChange={(e) =>
                                        setEditData({
                                            ...editData,
                                            tag_slug: e.target.value,
                                        })
                                    }
                                />
                            </div>

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

export default AdminBlogTag
