import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"

const AdminHero = () => {

    const [hero, setHero] = useState({
        id:"",
        heading_one:"",
        heading_two:"",
    });
    const [logoImage, setLogoImage] = useState(null);
    const [heroImage, setHeroImage] = useState(null);
    const [backgroundImage, setBackgroundImage] = useState(null);
    const [preview, setPreview] = useState({});

    //fetch hero
    const fetchHero = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/home/hero/get");
            const data = res.data.data;

            setHero({
                id: data.id,
                heading_one:data.heading_one,
                heading_two:data.heading_two,
            });
            setPreview({
                logo_image: data.logo_image,
                hero_image: data.hero_image,
                background_image: data.background_image,
            });

        } catch (error) {
            console.error("Error While Fetch Hero", error);
        }
    }

    useEffect(()=>{
        fetchHero();
    },[]);

    const handleChange = (e)=>{
        setHero({
            ...hero,
            [e.target.name]: e.target.value
        });
    }

    //update Hero
    const handleUpdate = async(e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("heading_one", hero.heading_one);
        formData.append("heading_two", hero.heading_two);

        if (logoImage) formData.append("logo_image", logoImage);
        if (heroImage) formData.append("hero_image", heroImage);
        if (backgroundImage) formData.append("background_image", backgroundImage);
        
        try {
            
            const res = await axios.put(`http://localhost:4000/api/home/hero/update/${hero.id}`,formData,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            toast.success("Hero Updated");
            fetchHero();
        } catch (error) {
            console.error("Error While Update Hero",error);
        }
    }

  return (
    <>
    <div className='hero-form-container'>
        <div className='hero-form-content'>

            <h2>Hero Section Management</h2>

            <form onSubmit={handleUpdate} className="admin-hero-form">
                 {/* Heading One */}
                <div className="hero-form-group">
                    <label>Heading One</label>
                    <input
                        type="text"
                        name="heading_one"
                        value={hero.heading_one}
                        onChange={handleChange}
                    />
                </div>

                {/* Heading Two */}
                <div className="hero-form-group">
                    <label>Heading Two</label>
                    <input
                        type="text"
                        name="heading_two"
                        value={hero.heading_two}
                        onChange={handleChange}
                    />
                </div>

                {/* Logo Image */}
                <div className="hero-form-group">
                    <label>Logo Image</label>
                    <input
                        type="file"
                        onChange={(e) => setLogoImage(e.target.files[0])}
                    />
                </div>
                {preview.logo_image && (
                    <img
                        src={`http://localhost:4000/uploads/home/hero/${preview.logo_image}`}
                        alt="logo"
                        style={{width:"150px", background:"black", padding:"10px"}}
                    />
                )}

                {/* Hero Image */}

                <div className="hero-form-group">
                    <label>Hero Image</label>
                    <input
                        type="file"
                        onChange={(e) => setHeroImage(e.target.files[0])}
                    />
                </div>
                {preview.hero_image && (
                    <img
                        src={`http://localhost:4000/uploads/home/hero/${preview.hero_image}`}
                        alt="hero"
                        style={{width:"150px"}}
                        className="preview-img"
                    />
                )}

                {/* Background Image */}
                <div className="hero-form-group">
                    <label>Background Image</label>
                    <input
                        type="file"
                        onChange={(e) => setBackgroundImage(e.target.files[0])}
                    />
                </div>
                {preview.background_image && (
                    <img
                        src={`http://localhost:4000/uploads/home/hero/${preview.background_image}`}
                        alt="background"
                        style={{width:"150px"}}
                        className="preview-img"
                    />
                )}

                <button type="submit" className='update-hero-btn'>Update Hero</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default AdminHero
