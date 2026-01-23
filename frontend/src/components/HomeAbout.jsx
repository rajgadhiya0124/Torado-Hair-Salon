import React from 'react'
import { BsTelephoneFill } from "react-icons/bs";

const HomeAbout = () => {
  return (
    <section className="home-about-section">
        <section className="containers">
            <img src="/image/home/about/about-side.png" className='about-side-img' alt="" />

            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className='about-left'>
                        <img src="/image/home/about/home-about.png" className='home-about-img' alt="" />

                        <img src="/image/home/about/about-sign.png" className="about-sign-img" alt="" />
                    </div>
                </div>

                <div className="col-12 col-6">
                    <div className='about-right'>
                        <span className='about-sub'>Welcome To Torado</span>

                        <h2 className='home-about-title'>We Are More Than A Beauty Salon In Your Town</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit do eiusmod tempo incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrice risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                        <h3>We Mend A Healthy & Strong Look To Your Hair Properly</h3>
                        <p>Rhoncus dolor quam etiam mattis tincidunt nec lobortis sociis facilisi aenean netus tempor duis labore magn set.</p>

                        <div className='home-aboutcall-info'>
                            <button className='about-btn'>
                                More About Us
                            </button>

                            <div className='about-call-content'>
                                <div className='about-phone-icon'>
                                    <BsTelephoneFill />
                                </div>
                                <div>
                                    <p className='m-0'>Call Us On:</p>
                                    <a className='about-contact-no'>+ 855 2669 1234 894</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeAbout
