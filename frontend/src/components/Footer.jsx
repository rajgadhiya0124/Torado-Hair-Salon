import React from 'react'
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { BsTelephoneFill } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
    <section className="footer-section">
        <section className="containers">
            <div className="row">

                <div className="col-lg-3 col-sm-6">
                    <div>
                        <img src="/image/navbar/navbar-logo.svg" alt="" />
                        <ul className='footer-info-ul'>
                            <li>
                                <IoLocationSharp className='footer-info-icon'/>
                                <div>
                                    <b>Location:</b> <br /> 3016 sunrise road las vegas
                                </div>
                            </li>
                            <li>
                                <MdEmail className='footer-info-icon'/>
                                <div>
                                    <b>Email:</b> <br />hello@torado.com
                                </div>
                            </li>
                            <li>
                                <BsTelephoneFill className='footer-info-icon'/>
                                <div>
                                    <b>Phone:</b> <br />(+30) 098765432150
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="col-lg-3 col-sm-6">
                    <h3 className='footer-headings'>Quick Links</h3>

                    <ul className='quicklink-ul'>
                        <li><MdKeyboardArrowRight/> About Us</li>
                        <li><MdKeyboardArrowRight/> Our Blog</li>
                        <li><MdKeyboardArrowRight/> Expert Staff</li>
                        <li><MdKeyboardArrowRight/> Populer Products</li>
                        <li><MdKeyboardArrowRight/> Contact Us</li>
                    </ul>
                </div>

                <div className="col-lg-3 col-sm-6">
                    <h3 className='footer-headings'>Salon Hours</h3>

                    <ul className='quicklink-ul'>
                       <li>
                            <b>Monday - Friday</b>
                            <p>09:00 AM - 10:00 PM</p>
                       </li>

                       <li>
                            <b>Saturday - Sunday</b>
                            <p>10:00 AM - 08:00 PM</p>
                       </li>
                    </ul>   
                </div>

                <div className="col-lg-3 col-sm-6">
                    <h3 className='footer-headings'>Our Services</h3>

                    <ul className='quicklink-ul'>
                        <li><MdKeyboardArrowRight/> Haircuts</li>
                        <li><MdKeyboardArrowRight/> Hair Styling</li>
                        <li><MdKeyboardArrowRight/> Hair Coloring</li>
                        <li><MdKeyboardArrowRight/> Makeup</li>
                        <li><MdKeyboardArrowRight/> Lashes</li>
                    </ul>   
                </div>
            </div>

            <div className='copyright-content'>
                <div>
                    Copyright Torado All Rights Reserved by EnvyTheme
                </div>
                <div>
                    <ul className='social-ul'>
                        <li><TiSocialFacebook /></li>
                        <li><FaTwitter /></li>
                        <li><IoLogoInstagram /></li>
                        <li><FaLinkedinIn /></li>
                    </ul>
                </div>
            </div>
        </section>
    </section>


    
    </>
  )
}

export default Footer
