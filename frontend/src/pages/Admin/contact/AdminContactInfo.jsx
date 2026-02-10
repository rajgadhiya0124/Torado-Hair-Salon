import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from "react-icons/io5";

import { toast } from 'react-toastify';

const AdminContactInfo = () => {

    const [contactInfo, setContactInfo] = useState([]);
    const [formData, setFormData] = useState({
        type: "",
        title: "",
        value_1: "",
        value_2: ""
    });

    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({
        id: "",
        type: "",
        title: "",
        value_1: "",
        value_2: ""
    });
    const token = localStorage.getItem("token");

    //fetch all contact Info
    const fetchContactInfo = async () => {
        const res = await axios.get( "http://localhost:4000/api/contactInfo/getAll");
        setContactInfo(res.data.data); // adjust if needed
    };

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    //create contact Info
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const res = await axios.post("http://localhost:4000/api/contactInfo/create",formData,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );

        toast.success("Contact Info Created");

        setFormData({
            type: "",title: "",value_1: "",value_2: ""
        });

        } catch (error) {
            console.error("Error while crreate contact info",error);
            alert("Error creating contact info");
        }
    };

    //update contact Info
    const openEditModel = (item)=>{
        setEditData(item);
        setEditModal(true);
    }

     const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };
    
    const handleUpdate = async (e) => {
    e.preventDefault();
        try {
            await axios.put(`http://localhost:4000/api/contactInfo/update/${editData.id}`,editData,
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        setEditModal(false);
        fetchContactInfo();
        toast.success("Updated Successfully");
        } catch (error) {
           console.error("Error While Update Contact Info",error); 
        }
    };

    //delete contact info
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        await axios.delete(`http://localhost:4000/api/contactInfo/delete/${id}`,
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
        );
        fetchContactInfo();
    };

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Contact Info Managment</h2>
        </div>

        <div className="admin-contactinfo-cotent">
            <h3>Create New Contact Info</h3>

            <form className='admin-contactinfo-form' onSubmit={handleSubmit}>

                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Type</option>
                    <option value="phone">Phone</option>
                    <option value="email">Email</option>
                    <option value="location">Location(Address)</option>
                </select>


                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="value_1"
                    placeholder="Value 1"
                    value={formData.value_1}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="value_2"
                    placeholder="Value 2"
                    value={formData.value_2}
                    onChange={handleChange}
                />

                <button type="submit" className='save-cntactinfo-btn'>Save Contact Info</button>

            </form>
        </div>

        <div className="contactinfo-form-content">
            <h3>Contact Info List</h3>

            <table className="admin-contactinfo-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Type</th>
                        <th>Title</th>
                        <th>Value 1</th>
                        <th>Value 2</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contactInfo.map((item,index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.type}</td>
                        <td>{item.title}</td>
                        <td>{item.value_1}</td>
                        <td>{item.value_2}</td>
                        <td>
                            <div className='admin-action-button'>
                                <button
                                    className="admin-edit-btn"
                                    onClick={() =>openEditModel(item)}
                                >
                                <IoPencil />
                                </button>
                                <button
                                    className="admin-delete-btn"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <BiSolidTrashAlt  />
                                </button>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* =====Edit  Modal ===== */}
        {editModal && (
            <div className="edit-modal-overlay">
                <div className="contactinfo-edit-modal">

                    <h3 className='edit-model-h3'>Update Contact Info</h3>

                    <form className='contactinfo-edit-form' onSubmit={handleUpdate}>

                    <select
                        name="type"
                        value={editData.type}
                        onChange={handleEditChange}
                    >
                        <option value="">Select Type</option>
                        <option value="phone">Phone</option>
                        <option value="email">Email</option>
                        <option value="address">Address</option>
                    </select>

                    <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                    />

                    <input
                        type="text"
                        name="value_1"
                        value={editData.value_1}
                        onChange={handleEditChange}
                    />

                    <input
                        type="text"
                        name="value_2"
                        value={editData.value_2 || ""}
                        onChange={handleEditChange}
                    />

                    <div className="update-model-action">
                        <button type="submit" className="admin-update-btn">
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
    </>
  )
}

export default AdminContactInfo
