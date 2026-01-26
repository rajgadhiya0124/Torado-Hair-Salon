import React from 'react'
import HomeAnimation from '../components/HomeAnimation'
import HomeOffer from '../components/HomeOffer'
import HomeService from '../components/HomeService'
import HomeAbout from '../components/HomeAbout'
import HomeShop from '../components/HomeShop'
import HomeGallery from '../components/HomeGallery'
import HomePrice from '../components/HomePrice'
import HomeTeam from '../components/HomeTeam'
import HomeFact from '../components/HomeFact'
import HomeTestimonials from '../components/HomeTestimonials'
import HomePartner from '../components/HomePartner'
import HomeAppointment from '../components/HomeAppointment'
import HomeNewsletter from '../components/HomeNewsletter'

const HomePage = () => {
  return (
    <>
    <section className="home-hero-section">
      <section className="home-containers">
        <div className='row'>
            <div className="col-lg-5 col-12">
              <div className='hero-left'>
                <div className='logo-img-div'>
                  <img src="/image/home/hero-logo.png" alt="" />
                </div>
                <h1 className='h1-one'>Best Haircut Salons</h1>
                <h1 className='h1-two'>For Men Women</h1>
              </div>
            </div>

            <div className="col-lg-7 col-12">
              <img src="/image/home/hero-right.png" className='hero-right-img' alt="" />
            </div>
            
        </div>

        <div className='row mt-5 align-items-center'>
          <div className="col-md-3 col-12">
            <div className=' bottom-image'>
              <img src="/image/home/hero-bottom.png" className='hero-bottom-img' alt="" />
            </div>
          </div>

          <div className="col-md-9 col-12">
            {/* <form className='hero-form'>
                <div>
                  <input 
                    type="text" 
                    className="hero-form-input"
                    placeholder='First Name'
                    />
                </div>
                <div>
                  <input 
                    type="email" 
                    className="hero-form-input"
                    placeholder='Email'
                  />
                </div>
                <div>
                  <input 
                    type="text" 
                    className="hero-form-input"
                    placeholder='Company'
                  />
                </div>
                <button type="submit" className='hero-send-btn'>Send</button>
              </form> */}
          </div>
        </div>


      </section>
    </section>

    <HomeAnimation />
    <HomeOffer />
    <HomeService />
    <HomeAbout />
    <HomeShop />  
    <HomeGallery />
    <HomePrice />
    <HomeTeam />
    <HomeFact />
    <HomeTestimonials />
    <HomePartner />
    <HomeAppointment />
    <HomeNewsletter />
    </>
  )
}

export default HomePage
