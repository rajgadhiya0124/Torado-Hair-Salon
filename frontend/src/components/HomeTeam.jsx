import React from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { BiLogoTwitter } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { LiaLinkedinIn } from "react-icons/lia";

const HomeTeam = () => {
  return (
    <section className="home-team-section">
        <section className="containers">
            <div className="home-team-head">
                <span className='team-sub'>Team Experts</span>
                <h3 className='team-title'>Our Excellent & Expert Staff</h3>
            </div>

            <div className="team-main-section">
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="home-team-card">
                            <div className='team-image-content'>
                                <img src="/image/home/team/team-1.jpg" className='home-team-image'  alt="" />
                                <div className='home-team-icon'>
                                    <button><TiSocialFacebook /></button>
                                    <button><BiLogoTwitter /></button>
                                    <button><FaInstagram /></button>
                                    <button><LiaLinkedinIn /></button>
                                </div>
                            </div>
                            <div className='home-team-info'>
                                <h3 className='team-name'>Knight Heather</h3>
                                <p className='team-role'>Hair Specialist</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="home-team-card offset">
                            <div className='team-image-content'>
                                <img src="/image/home/team/team-2.jpg" className='home-team-image'  alt="" />
                                <div className='home-team-icon'>
                                    <button><TiSocialFacebook /></button>
                                    <button><BiLogoTwitter /></button>
                                    <button><FaInstagram /></button>
                                    <button><LiaLinkedinIn /></button>
                                </div>
                            </div>
                            <div className='home-team-info'>
                                <h3 className='team-name'>Ronald Agaton</h3>
                                <p className='team-role'>Senior Stylist</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="home-team-card">
                           <div className='team-image-content'>
                                <img src="/image/home/team/team-3.jpg" className='home-team-image'  alt="" />
                                <div className='home-team-icon'>
                                    <button><TiSocialFacebook /></button>
                                    <button><BiLogoTwitter /></button>
                                    <button><FaInstagram /></button>
                                    <button><LiaLinkedinIn /></button>
                                </div>
                            </div>
                            <div className='home-team-info'>
                                <h3 className='team-name'>Brawon Melesha</h3>
                                <p className='team-role'>Color Specialist</p>
                            </div>
                        </div>
                    </div>
                   <div className="col-12 col-sm-6 col-lg-3">
                        <div className="home-team-card offset">
                           <div className='team-image-content'>
                                <img src="/image/home/team/team-4.jpg" className='home-team-image'  alt="" />
                                <div className='home-team-icon'>
                                    <button><TiSocialFacebook /></button>
                                    <button><BiLogoTwitter /></button>
                                    <button><FaInstagram /></button>
                                    <button><LiaLinkedinIn /></button>
                                </div>
                            </div>
                            <div className='home-team-info'>
                                <h3 className='team-name'>Gertrude Barrow</h3>
                                <p className='team-role'>Nail Specialist</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeTeam
