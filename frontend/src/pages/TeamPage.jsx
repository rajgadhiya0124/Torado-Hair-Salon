import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TiSocialFacebook } from "react-icons/ti";
import { BiLogoTwitter } from "react-icons/bi";
import { IoLogoInstagram } from "react-icons/io";
import { BiLogoLinkedin } from "react-icons/bi";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { toast } from 'react-toastify';

const TeamPage = () => {

    const [team, setTeam] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [leadForm , setLeadForm] = useState({
        user_name:"",
        email:"",
        company: ""
    });

    const token = localStorage.getItem("token");

    //fetch team 
    const fetchTeam = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/team/getAll");
            setTeam(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Team",error);
        }
    } 

    useEffect(()=>{
        fetchTeam();
    },[]);


    //lead form

    const handleChange = (e) => {
        setLeadForm({
            ...leadForm,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:4000/api/leadform/create",leadForm,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                setLeadForm({ user_name: "", email: "", company: "" });
            }

        } catch (error) {
            console.error("Erroe While Submit lead form",error);
        }
    }

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const CurrentTeam = team.slice(firstIndex,lastIndex);

    const totalPage = Math.ceil(team.length / itemsPerPage);

  return (
    <>
    <section className="team-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Our Team Members</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Team</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/team/team-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className='team-page-section'>
        <section className="containers">
            <div className='team-head-content'>
                <span className='teams-sub'>Team Experts</span>
                <h2 className='teams-head-title'>Our Excellent & Expert Staff</h2>
            </div>

            <div>
                <div className="row">
                    {CurrentTeam.map((item,index)=>(
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className='team-card'>

                            <div className='team-img-box'>
                                <img src={`http://localhost:4000/uploads/team/${item.person_image}`} 
                                    className={`teams-img ${(index % 2 !== 0) ? 'team-down-img' : ''}`} alt="" 
                                />

                                <div className=''>
                                    <ul className='t-social-ul'>
                                        <li><TiSocialFacebook /></li>
                                        <li><BiLogoTwitter /></li>
                                        <li><IoLogoInstagram /></li>
                                        <li><BiLogoLinkedin /></li>
                                    </ul>
                                </div>
                            </div>

                            <div className='teams-info'>
                                <h3>{item.person_name}</h3>
                                <p>{item.person_role}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
                
                <div className='pagination'>
                    <button
                    className='pagination-left-btn'
                        disabled = {currentPage === 1}
                        onClick={()=> setCurrentPage(currentPage - 1)}
                    >
                        <MdOutlineKeyboardArrowLeft />
                    </button>

                    {[...Array(totalPage)].map((_,index)=>(
                        <button
                            key={index}
                            className={`pagination-btn ${currentPage === index + 1 ? "active" : "" }`}
                            onClick={()=>setCurrentPage(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}

                    <button
                    className='pagination-right-btn'
                        disabled = {currentPage === totalPage}
                        onClick={()=>setCurrentPage(currentPage + 1)}
                    >
                        <MdOutlineKeyboardArrowRight />
                    </button>
                </div>

            </div>
        </section>
    </section>

    <section className='lead-section'>
        <section className="containers">
            <form className='lead-form' onSubmit={handleSubmit}>
             
                <input 
                    type="text" 
                    className="lead-form-input"
                    placeholder='Name'
                    name="user_name"
                    value={leadForm.user_name}
                    onChange={handleChange}
                />
              
                <input 
                    type="email" 
                    className="lead-form-input"
                    placeholder='Email'
                    name="email"
                    value={leadForm.email}
                    onChange={handleChange}
                />
        
                <input 
                    type="text" 
                    className="lead-form-input"
                    placeholder='Company'
                    name="company"
                    value={leadForm.company}
                    onChange={handleChange}
                />
              
              <button type="submit" className='send-btn'>Send</button>
            </form>
        </section>
    </section>
    </>
  )
}

export default TeamPage
