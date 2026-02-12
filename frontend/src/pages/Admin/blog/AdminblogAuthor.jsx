import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { TiArrowSync } from 'react-icons/ti';

const AdminblogAuthor = () => {

    const [authors, setAuthors] = useState([]);

    const [createModal,setcreateModal] = useState(false);
    const [formData, setFormData] = useState({
        author_name: "",
        author_bio: "",
        author_image: null,
    });

    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({
        id:"",
        author_name: "",
        author_bio: "",
        author_image: null,
    });

    const [viewModal, setViewModal] = useState(false);
    const [selectedAuthor, setSelectedAutor] = useState(null);
    
    const token = localStorage.getItem("token");

    // Fetch All Authors
    const fetchAuthors = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/blog/author/getall");
            setAuthors(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    //create
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    // Create Author
    const handleSubmit = async (e) => {
    e.preventDefault();

        const data = new FormData();
        data.append("author_name", formData.author_name);
        data.append("author_bio", formData.author_bio);
        data.append("author_image", formData.author_image);

        await axios.post("http://localhost:4000/api/blog/author/create",data,
            { headers: { 
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}` } 
            });
            setcreateModal(false);
            setFormData({author_name: "",author_bio: "",author_image: null,});
            fetchAuthors();
    };

    //
    const handleView = (item)=>{
        setSelectedAutor(item)
        setViewModal(true);
    }

    // Open Edit Modal
    const openEditModal = (author) => {
        setEditData(author);
        setEditModal(true);
    };

    const handleEditChange = (e)=>{
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        })
    }
    //update author
    const handleUpdate = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("author_name", editData.author_name);
        data.append("author_bio", editData.author_bio);

        if (editData.author_image instanceof File) {
            data.append("author_image", editData.author_image);
        }
        try {
            await axios.put(`http://localhost:4000/api/blog/author/update/${editData.id}`,data,
            { headers: { 
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}` },
            }
        );

        setEditModal(false);
        fetchAuthors();
        } catch (error) {
            console.error("Error While update Author");
        }
    };


    //update status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/blog/author/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchAuthors();
        } catch (error) {
            console.error("Error while change Author status",error);
        }
    };

    //delete Author
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/blog/author/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchAuthors();
        } catch (error) {
            console.error("Error while delete Author",error);
        }
    }

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Blog Author Managment</h2>
        </div>

        <div className='admin-add-btn-wrapper'>
            <button className='admin-add-btn' onClick={()=>setcreateModal(true)}>
                + Add Author
            </button>
        </div>
        
        <div className='admin-author-table-content'>
            <table className="admin-author-table">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Author</th>
                    <th>Author Name</th>
                    <th>Bio Graphy</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>
                {authors.map((item,index) => (
                    <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={`http://localhost:4000/uploads/blog/author/${item.author_image}`} 
                            className='admin-author-img'    
                        alt="" />
                    </td>
                    <td>{item.author_name}</td>
                    <td>{item.author_bio.substring(0,80)}</td>
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
                            <button className='admin-view-btn'
                                onClick={()=>handleView(item)}
                            >
                                <MdOutlineRemoveRedEye />
                            </button>
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
        </div>

        {viewModal && selectedAuthor && (
        <div className="appoinntview-modal-overlay">
            <div className="appointment-view-modal">
                <div className="author-modal-header">
                    <h3>Author Details</h3>
                </div>

                <div className="view-modal-body">
                    <div className="author-info-wrapper">
                        <div className="author-info">
                            <span className="author-image">
                                <img
                                src={`http://localhost:4000/uploads/blog/author/${selectedAuthor.author_image}`}
                                alt=""
                                />
                            </span>
                            <div className="author-details">
                                <span className="author-name">
                                    {selectedAuthor.author_name}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="message-box">
                        <span className="appoint-view-label">Author Bio</span>
                        <p>{selectedAuthor.author_bio}</p>
                    </div>

                    <div className="view-modal-action">
                        <button
                            className="admin-close-btn"
                            onClick={() => setViewModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>

            </div>
        </div>
        )}

        {/* Edit Modal */}
        {editModal && (
            <div className="author-edit-modal-overlay">
                <div className="author-edit-modal">
                    <h3>Edit Author</h3>

                    <form className='author-edit-form' onSubmit={handleUpdate}>
            
                    <label htmlFor="">Author Name</label>
                    <input
                        type="text"
                        name="author_name"
                        value={editData.author_name}
                        onChange={handleEditChange}
                    />

                    <label htmlFor="">Author Image</label>
                    <input
                        type="file"
                        name="author_image"
                        onChange={(e)=>{
                            setEditData({
                                ...editData,
                                author_image: e.target.files[0]
                            })
                        }}
                        accept="image/*"
                    />
                    
                    <label htmlFor="">Author Bio</label>
                    <textarea
                        name="author_bio"
                        rows={8}
                        value={editData.author_bio}
                        onChange={handleEditChange}
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

        {/* create modal */}
        {createModal && (
            <div className="author-edit-modal-overlay">
                <div className="author-edit-modal">
                <h3>Add Author</h3>

                <form onSubmit={handleSubmit} className="author-edit-form">
                    <input
                        type="text"
                        name="author_name"
                        placeholder="Author Name"
                        value={formData.author_name}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="author_bio"
                        placeholder="Author Bio"
                        rows={8}
                        value={formData.author_bio}
                        onChange={handleChange}
                    />

                    <input
                        type="file"
                        name="author_image"
                        onChange={(e)=>{
                            setFormData({
                                ...formData,
                                author_image: e.target.files[0]
                            })
                        }}
                        accept="image/*"
                        required
                    />

                    <div className="update-model-action">
                        <button type="submit" className="admin-create-btn">
                            Create
                        </button>

                        <button
                            type="button"
                            className="admin-cancel-btn"
                            onClick={() => setcreateModal(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
        )}

    </>
  )
}

export default AdminblogAuthor
