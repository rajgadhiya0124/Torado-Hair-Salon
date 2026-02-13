import axios from 'axios';
import React, { useRef, useState } from 'react'
import {toast} from "react-toastify"

const AdminServiceCreate = () => {
    const iconRef = useRef(null);
    const imageRef = useRef(null);
    const bgRef = useRef(null);
    const [formData, setFormData] = useState({
        service_name: "",
        price: "",
        service_video: "",
        service_description: "",
        service_icon: null,
        service_image: null,
        service_video_bg: null
    });

    const token = localStorage.getItem("token");

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImageChange = (e)=>{
        const { name, files } = e.target;

        setFormData({
            ...formData,
            [name]: files[0],
        });
    }

     const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const data = new FormData();
        
        data.append("service_name",formData.service_name)
        data.append("price",formData.price)
        data.append("service_video",formData.service_video)
        data.append("service_description",formData.service_description)

        if (formData.service_icon instanceof File) {
            data.append("service_icon", formData.service_icon);
        }
        if (formData.service_image instanceof File) {
            data.append("service_image", formData.service_image);
        }
        if (formData.service_video_bg instanceof File) {
            data.append("service_video_bg", formData.service_video_bg);
        }

        await axios.post("http://localhost:4000/api/service/create",data,
            { 
                headers: { 
                    Authorization: `Bearer ${token}`,
                } 
            }
        );

        toast.success("ervice Created")
        setFormData({
            service_name: "",price: "",service_video: "",service_description: "",
            service_icon: null ,service_image: null,service_video_bg: null
        });
        if (iconRef.current) iconRef.current.value = "";
        if (imageRef.current) imageRef.current.value = "";
        if (bgRef.current) bgRef.current.value = "";

        } catch (error) {
            console.error("Error While Create Service",error);
            alert("Error creating service");
        }
    };

  return (
    <div className="admin-service-form-content">
      <h2>Create Service</h2>

      <form onSubmit={handleSubmit} className="service-form">

        <div className='service-form-group'>  
            <label className='service-view-label'>Service Name</label>
            <input
                type="text"
                name="service_name"
                placeholder="Service Name"
                value={formData.service_name}
                onChange={handleChange}
                required
            />
        </div>

        <div className='service-form-group'> 
            <label className='service-view-label'>Service Price</label>
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
            />
        </div>

        <div className='service-form-group'> 
            <label className='service-view-label'>Service Video Url</label>
            <input
                type="text"
                name="service_video"
                placeholder="Service Video URL"
                value={formData.service_video}
                onChange={handleChange}
            />
        </div>

        <div className='service-form-group'>
            <label className='service-view-label'>Service Icon</label>
            <input
                ref={iconRef}
                type="file"
                name="service_icon"
                onChange={handleImageChange}
                accept="image/*"
            />
        </div>

        <div className='service-form-group'>  
            <label className='service-view-label'>Service Image</label>
            <input
                ref={imageRef}
                type="file"
                name="service_image"
                onChange={handleImageChange}
                accept="image/*"
            />
        </div>

        <div className='service-form-group'>  
            <label className='service-view-label'>Service Video Background</label>
            <input
                ref={bgRef}
                type="file"
                name="service_video_bg"
                onChange={handleImageChange}
                accept="image/*,video/*"
            />
        </div>

        <div className='service-form-group'>  
            <label className='service-view-label'>Service Content</label>
            <textarea
                name="service_description"
                placeholder="Service Description"
                value={formData.service_description}
                onChange={handleChange}
                rows="5"
            />
        </div>

        <button type="submit" className="service-create-btn">
          Create Service
        </button>

      </form>
    </div>
  )
}

export default AdminServiceCreate
