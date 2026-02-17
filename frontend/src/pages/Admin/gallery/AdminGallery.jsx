import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import FormateDate from '../../../components/FormateDate';
import { TiArrowSync } from 'react-icons/ti';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoPencil } from 'react-icons/io5';

const AdminGallery = () => {

    const [gallery, setGallery] = useState([]);
    const [gallerycategory, setGalleryCategory] = useState([]);

    const [createModal, setCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        category_id: "",
        serivce_name: "",
        service_image: null
    });
    const [EditModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({
        id:"",
        category_id: "",
        serivce_name: "",
        service_image: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentgallery = gallery.slice(firstIndex,lastIndex);
    
    const totalPages = Math.ceil(gallery.length / itemsPerPage);

    const token = localStorage.getItem("token");

    //get all gallery
    const fetchGallery = async () => {
        const res = await axios.get("http://localhost:4000/api/gallery/getall");
        setGallery(res.data.data);
    };

    // get all gallery category
    const fetchGalleryCategory = async () => {
        const res = await axios.get("http://localhost:4000/api/gallery/category/getAll");
        const Activecategory = res.data.data.filter(
            (item)=> item.status === 1
        )
        setGalleryCategory(Activecategory);
    };

    useEffect(()=>{
        fetchGallery();
        fetchGalleryCategory();
    }, []);

    const handleChange = (e)=>{
        const { name, value, files } = e.target;

        if(name === "service_image"){
            setFormData({ ...formData, service_image: files[0]})
        }else{
            setFormData({...formData, [name]: value})
        }
    };

    //create Gallery
    const handleCreate = async(e)=>{
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("category_id", formData.category_id);
            data.append("serivce_name", formData.serivce_name);
            data.append("service_image", formData.service_image);

            await axios.post("http://localhost:4000/api/gallery/create",data,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            setCreateModal(false);
            fetchGallery();

        } catch (error) {
            console.error("Error While Create Gallery",error);
        }
    }


    //update Gallery
    const openEditModal = (item)=>{
        setEditData({
            id: item.id,
            category_id: item.category_id,
            serivce_name: item.serivce_name,
            service_image: item.service_image
        });
        setEditModal(true);
    }   

    const handleUpdate = async(e)=>{
        e.preventDefault();

        try {
            const data = new FormData();

            data.append("category_id", editData.category_id);
            data.append("serivce_name", editData.serivce_name);

            if (editData.service_image instanceof File) {
                data.append("service_image", editData.service_image);
            }

            await axios.put(`http://localhost:4000/api/gallery/update/${editData.id}`,data,
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            toast.success("Gallery Updated");
            fetchGallery();
            setEditModal(false);
        } catch (error) {
            console.error("Error While Update Gallery",error);
        }
    }

    //update Gallery Cat status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/gallery/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchGallery();
        } catch (error) {
            console.error("Error while change Gallery status",error);
        }
    };

    //delete gallery
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/gallery/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchGallery();
        } catch (error) {
            console.error("Error While Delete Gallery",error);
        }
    }

    
  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Gallery Management</h2>
        </div>  

        <div className="admin-add-btn-wrapper">
            <button className="admin-add-btn" onClick={()=>setCreateModal(true)}>
                + Add Gallery
            </button>
        </div>

        <div className='gallery-cat-table-content'>
            <table className="gallery-cat-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gallery Image</th>
                        <th>Service Name</th>
                        <th>Service Category</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {currentgallery.map((item, index) => (
                    <tr key={item.id}>
                        <td>{firstIndex + index + 1}</td>
                        <td>
                            <img src={`http://localhost:4000/uploads/gallery/${item.service_image}`} 
                                style={{width:"100px", height: "70px", objectFit:"cover",borderRadius:"8px"}} 
                                alt="" />
                        </td>
                        <td>{item.serivce_name}</td>
                        <td>{item.category_name}</td>
                        <td>{FormateDate(item.createdAt)}</td>
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
                                    <BiSolidTrashAlt />
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

       {createModal && (
        <div className="gallery-create-modal-overlay">
        <div className="gallery-create-modal">
            <h3>Create Gallery</h3>

            <form onSubmit={handleCreate} className='gallery-create-form'>

                <label htmlFor="">Service Name</label>
                <input
                    type="text"
                    name="serivce_name"
                    placeholder="Service Name"
                    value={formData.serivce_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="">Service Image</label>
                <input
                    type="file"
                    name="service_image"
                    onChange={handleChange}
                    required
                />

                {formData.service_image instanceof File &&(
                    <img src={URL.createObjectURL(formData.service_image)} 
                        style={{
                            width:"250px", height:"150px", objectFit:"cover",
                            borderRadius:"8px"
                        }}
                        alt="preview" 
                    />
                )}

                <label htmlFor="">Select Category</label>
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    {gallerycategory.map(cat => (
                        <option key={cat.id} value={cat.id}>
                            {cat.category_name}
                        </option>
                    ))}
                </select>

                <div className="update-model-action">
                    <button type="submit" className='admin-create-btn'>Create</button>
                    <button type="button" className='admin-close-btn' onClick={() => setCreateModal(false)}>
                        Close
                    </button>
                </div>
            </form>
        </div>
        </div>
        )}
            
       {/* Edit Modal */}
       {EditModal && editData && (
        <div className="gallery-update-modal-overlay">
            <div className="gallery-update-modal">
                <h3>Update Gallery</h3>

                <form onSubmit={handleUpdate} className='gallery-edit-form'>
                    
                    <label htmlFor="">Service Name</label>
                    <input
                        type="text"
                        value={editData.serivce_name}
                        onChange={(e) =>
                            setEditData({ ...editData, serivce_name: e.target.value })
                        }
                        required
                    />

                    <label htmlFor="">Service Image</label>
                    <input
                        type="file"
                        onChange={(e) =>
                            setEditData({ ...editData, service_image: e.target.files[0] })
                        }
                    />

                    {editData.service_image instanceof File && (
                    <img
                        src={URL.createObjectURL(editData.service_image)}
                        style={{
                            width:"250px", height:"150px", objectFit:"cover",
                            borderRadius:"8px"
                        }}
                        alt="preview"
                    />
                    )}

                    <span>Select Category</span>
                    <select
                        value={editData.category_id}
                        onChange={(e) =>
                            setEditData({ ...editData, category_id: e.target.value })
                        }
                        required
                    >
                        <option value="">Select Category</option>
                        {gallerycategory.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.category_name}
                            </option>
                        ))}
                    </select>

                    <div className="update-model-action">
                        <button type="submit" className='admin-update-btn'>Update</button>
                        <button type="button" className='admin-close-btn' 
                            onClick={() => setEditModal(false)}>
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

export default AdminGallery
