import React, { useEffect, useState } from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { BiLogoTwitter } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { LiaLinkedinIn } from "react-icons/lia";
import axios from 'axios';
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from 'react-router-dom';

const HomeTeam = () => {

    const [team,setTeam] = useState([]);
    
    // fetch teams
    const fetchteam = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/team/getAll");
            setTeam(res.data.data);
        } catch (error) {
            console.error("Error while feth team",error);
        }
    }

    useEffect(()=>{
        fetchteam();
    },[]);


  return (
    <section className="home-team-section">
        <section className="containers">
            <div className="home-team-head">
                <span className='team-sub'>Team Experts</span>
                <h3 className='team-title'>Our Excellent & Expert Staff</h3>
            </div>

            <div className="team-main-section">
                <div className="row">
                    {team.slice(0,4).map((item)=>(
                    <div className="col-12 col-sm-6 col-lg-3" key={item.id}>
                        <div className="home-team-card">
                            <div className='team-image-content'>
                                <img src={`http://localhost:4000/uploads/team/${item.person_image}`} className='home-team-image'  alt="" />
                                <div className='home-team-icon'>
                                    <button><TiSocialFacebook /></button>
                                    <button><BiLogoTwitter /></button>
                                    <button><FaInstagram /></button>
                                    <button><LiaLinkedinIn /></button>
                                </div>
                            </div>
                            <div className='home-team-info'>
                                <h3 className='team-name'>{item.person_name}</h3>
                                <p className='team-role'>{item.person_role}</p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

                <div className='explor-more-content'>
                    <Link to={"/team"}  className='explor-more-link'>
                        Explore More  <MdArrowRightAlt />
                    </Link>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeTeam
