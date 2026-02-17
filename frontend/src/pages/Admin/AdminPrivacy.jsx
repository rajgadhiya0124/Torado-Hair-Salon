import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AdminPrivacy = () => {

    const [formData, setFormData] = useState({
        id: 1,
        sub_title:"",
        title: "",
        content: ""
    });

    const token = localStorage.getItem("token");

    //fetch privacy data
     const fetchPrivacy = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/privacy/get");
            const data = res.data.data;

            setFormData({
                id: data.id,
                sub_title: data.sub_title || "",
                title: data.title || "",
                content: data.content || ""
            });

        } catch (error) {
            console.log("Error While Fetch Privacy",error);
        }
    };

    useEffect(()=>{
        fetchPrivacy();
    },[]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async(e)=>{
        e.preventDefault();

        try {
            await axios.put( `http://localhost:4000/api/privacy/update/${formData.id}`,
                {   
                    sub_title: formData.sub_title,
                    title: formData.title,
                    content: formData.content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            toast.success("Privacy Updated")
        } catch (error) {
            console.log("Error While Update Privcy Policy",error);
        }
    }


  return (
    <div className='privcy-form-contentainer'>
        
        <div className='privacy-form-content'>

            <h2>Privcy Policy</h2>

            <form onSubmit={handleUpdate} className="privacy-form">

                <div className="privacy-form-group">
                    <label>Sub Title</label>
                    <input
                        type="text"
                        name="sub_title"
                        value={formData.sub_title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="privacy-form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="privacy-form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        rows="12"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="update-privacy-btn"
                >
                    Update Privacy
                </button>

            </form>
        </div>
    </div>
  )
}

export default AdminPrivacy
