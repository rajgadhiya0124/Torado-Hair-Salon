import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AdminAbout = () => {

    const [aboutus, setAboutus] = useState({
        id:"",
        about_image:null,
        sub_title:"",
        main_title:"",
        small_description:"",
        second_title:"",
        second_description:"",
        contact_no:""
    });
    const [aboutImage, setAboutImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const fetchAbout = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/home/about/get");
            const data = res.data.data;
            
            setAboutus({
                id: data.id,    
                sub_title: data.sub_title,
                main_title: data.main_title,
                small_description: data.small_description,
                second_title: data.second_title,
                second_description: data.second_description,
                contact_no: data.contact_no
            })
            setPreview({ about_image: data.about_image})

        } catch (error) {
            console.error("Error While Fetch About data",error);
        }
    }

    useEffect(()=>{
        fetchAbout();
    },[]);

    const handleChange = (e)=>{
        setAboutus({
            ...aboutus,
            [e.target.name]: e.target.value
        });
    }

    //update home Aboutus
    const handleUpdate = async(e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("sub_title", aboutus.sub_title);
        formData.append("main_title", aboutus.main_title);
        formData.append("small_description", aboutus.small_description);
        formData.append("second_title", aboutus.second_title);
        formData.append("second_description", aboutus.second_description);
        formData.append("contact_no",aboutus.contact_no);

        if(aboutImage) {
            formData.append("about_image",aboutImage)
        }
    
        try {
            const res = await axios.put(`http://localhost:4000/api/home/about/update/${aboutus.id}`,formData,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            toast.success("aboutus updated");
            fetchAbout();
        } catch (error) {
            console.error("Error While Fecth home aboutus",error);
        }
    }

  return (
    <div className='home-about-form-container'>
        <div className='home-about-form-content'>

            <h2>Hero Section Management</h2>

            <form onSubmit={handleUpdate} className="home-about-form">

                <div className='home-about-form-group'>
                    <label>About Image</label>
                    <input
                        type="file"
                        onChange={(e) => setAboutImage(e.target.files[0])}
                    />
                </div>

                {preview && (
                <img
                    src={`http://localhost:4000/uploads/home/about/${preview.about_image}`}
                    alt="about"
                    style={{width:"150px"}}
                    className="preview-img"
                />
                )}

                <div className='home-about-form-group'>
                    <label>Sub Title</label>
                    <input
                        type="text"
                        name="sub_title"
                        value={aboutus.sub_title}
                        onChange={handleChange}
                    />
                </div>

                <div className='home-about-form-group'>
                    <label>Main Title</label>
                    <input
                        type="text"
                        name="main_title"
                        value={aboutus.main_title}
                        onChange={handleChange}
                    />
                </div>

                <div className='home-about-form-group'>
                    <label>Small Description</label>
                    <textarea
                        name="small_description"
                        value={aboutus.small_description}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <div className='home-about-form-group'>
                    <label>Second Title</label>
                    <input
                        type="text"
                        name="second_title"
                        value={aboutus.second_title}
                        onChange={handleChange}
                    />
                </div>

                <div className='home-about-form-group'>
                    <label>Second Description</label>
                    <textarea
                        name="second_description"
                        value={aboutus.second_description}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <div className='home-about-form-group'>
                    <label>Contact Number</label>
                    <input
                        type="text"
                        name="contact_no"
                        value={aboutus.contact_no}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className='update-about-btn'>
                    Update Aboutus
                </button>

            </form>
        </div>
    </div>
  )
}

export default AdminAbout
