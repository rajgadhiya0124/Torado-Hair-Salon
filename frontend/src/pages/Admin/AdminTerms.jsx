import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AdminTerms = () => {

    const [formData, setFormData] = useState({
        id: 1,
        sub_title:"",
        title: "",
        content: ""
    });

    const token = localStorage.getItem("token");

    const fetchTerms = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/terms/get")
            const data = res.data.data;

            setFormData({
                id: data.id,
                sub_title: data.sub_title,
                title: data.title,
                content: data.content
            })
        } catch (error) {
            console.error("Error While Fetch Terms",error);
        }
    }

    useEffect(()=>{
        fetchTerms();
    },[]);

    //update Terms
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async(e)=>{
        e.preventDefault();

        try {
            await axios.put(`http://localhost:4000/api/terms/update/${formData.id}`,
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
            toast.success("terms Updated")
        } catch (error) {
            console.log("Error While Update terms",error);
        }
    }

  return (
    <div className='privcy-form-contentainer'>
        
        <div className='privacy-form-content'>

            <h2>Terms & Condition</h2>

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

export default AdminTerms
