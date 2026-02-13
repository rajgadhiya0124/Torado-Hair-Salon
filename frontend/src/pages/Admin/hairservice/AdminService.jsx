import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi'
import { IoPencil } from 'react-icons/io5'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { TiArrowSync } from 'react-icons/ti'
import FormateDate from '../../../components/FormateDate'
import { toast } from 'react-toastify'

const AdminService = () => {

    const [service, setService] = useState([]);

    const [editModal, setEditModal] = useState(false);
    const [editData, setEditData] = useState({
        id:"",
        service_name: "",
        price: "",
        service_video: "",
        service_description: "",
        service_icon: null,
        service_image: null,
        service_video_bg: null,
        is_top : 0
    });

    const token = localStorage.getItem("token");

    //fetch services
    const fetchServices = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/service/getAll");
            setService(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Services");
        }
    }

    useEffect(()=>{
        fetchServices();
    },[]);

    const handleEditChange = (e)=>{

        const { name, value, checked } = e.target;

        if(name === "is_top"){
            setEditData({
                ...editData, is_top: checked ? 1 : 0
            })
        }else{
            setEditData({ ...editData, [name]: value });
        }
        // setEditData({
        //     ...editData,
        //     [e.target.name]:e.target.value
        // })
    }

    const handleImageChange = (e)=>{
        const { name, files } = e.target;
        setEditData({
            ...editData,
            [name]: files[0],
        });
    }

    const openEditModal = (item)=>{
        setEditData({
            id: item.id,
            service_name: item.service_name,
            price: item.price,
            service_video: item.service_video || "",
            service_description: item.service_description || "",
            service_icon: null,
            service_image: null,
            service_video_bg: null,
            is_top: item.is_top
        })
        setEditModal(true);
    }

    const handleUpdateService = async (e) => {
    e.preventDefault();

        try {
            const data = new FormData();

            data.append("service_name", editData.service_name);
            data.append("price", editData.price);
            data.append("service_video", editData.service_video);
            data.append("service_description", editData.service_description);
            data.append("is_top", editData.is_top);

            if (editData.service_icon) {
                data.append("service_icon", editData.service_icon);
            }
            if (editData.service_image) {
                data.append("service_image", editData.service_image);
            }
            if (editData.service_video_bg) {
                data.append("service_video_bg", editData.service_video_bg);
            }

            await axios.put(`http://localhost:4000/api/service/update/${editData.id}`,data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            toast.success("Services Updated")
            setEditModal(false);
            fetchServices();
        } catch (error) {
            console.error("Error While Updating Service", error);
        }
    };

    //update Service status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/service/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchServices();
        } catch (error) {
            console.error("Error while change Service status",error);
        }
    };

    //delete service
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/service/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchServices();
        } catch (error) {
            console.error("Error while Delete Service",error);
        }
    } 

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Salon Services Managment</h2>
        </div>

        <div className='admin-blog-table-content'>
            <table className="admin-blog-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>service </th>
                    <th>service Name</th>
                    <th>service Price</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {service.map((item,index) => (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                        <img src={`http://localhost:4000/uploads/salon-service/${item.service_image}`} 
                            style={{width:"100px", height:"80px", borderRadius:"8px", objectFit:"cover"}}
                        />
                    </td>
                    <td>{item.service_name}</td>
                    <td>${item.price}</td>
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
        </div>

        {editModal && (
            <div className="admin-service-update-overlay">
                <div className="admin-service-update-modal">
                    <h3>Update Service</h3>

                    <form onSubmit={handleUpdateService} className="service-update-form">

                        <div className="service-update-group">
                            <label className='service-update-label'>Service Name</label>
                            <input
                                type="text"
                                name="service_name"
                                value={editData.service_name}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <div className="service-update-group">
                            <label className='service-update-label'>Price</label>
                            <input
                                type="number"
                                name="price"
                                value={editData.price}
                                onChange={handleEditChange}
                                required
                            />
                        </div>

                        <div className="service-update-group">
                            <label className='service-update-label'>Service Video URL</label>
                            <input
                                type="text"
                                name="service_video"
                                value={editData.service_video}
                                onChange={handleEditChange}
                            />
                        </div>

                        <div className="service-update-group">
                            <label className='service-update-label'>Service Icon</label>
                            <input
                                type="file"
                                name="service_icon"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="service-update-group">
                            <label className='service-update-label'>Service Image</label>
                            <input
                                type="file"
                                name="service_image"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="service-update-group">
                            <label className='service-update-label'>Video Background Image</label>
                            <input
                                type="file"
                                name="service_video_bg"
                                onChange={handleImageChange}
                            />
                        </div>

                        <div className="form-group">
                            <label className="checkbox-container">
                                <input
                                    type="checkbox"
                                    name="is_top"
                                    checked={editData.is_top === 1}
                                    onChange={handleEditChange}
                                />
                                Mark as Top Service
                            </label>
                        </div>
                        <div className="service-update-group">
                            <label className='service-update-label'>Description</label>
                            <textarea
                                name="service_description"
                                value={editData.service_description}
                                onChange={handleEditChange}
                                rows="10"
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
    </>
  )
}

export default AdminService
