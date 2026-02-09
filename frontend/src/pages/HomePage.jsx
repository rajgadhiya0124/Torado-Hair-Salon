import React, { useEffect, useState } from 'react'
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
import { toast } from 'react-toastify'
import axios from 'axios'

const HomePage = () => {

    const [hero,setHero] = useState([]);
    const [leadForm , setLeadForm] = useState({
      user_name:"",
      email:"",
      company: ""
    });
  
    const token = localStorage.getItem("token");

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

    //fetch hero section data
    const fetchero = async()=>{
      try {
          const res = await axios.get("http://localhost:4000/api/home/hero/get");
          setHero(res.data.data);
      } catch (error) {
        console.error("Error While Fetch Hero",error);
      }
    }

    useEffect(()=>{
      fetchero();
    },[]);

  return (
    <>
    <section className="home-hero-section" 
      style={{background:`url(http://localhost:4000/uploads/home/hero/${hero.background_image})`}}>

      <div className="hero-overlay"></div>

      <section className="home-containers">
        <div className='row'>
            <div className="col-lg-5 col-12">
              <div className='hero-left'>
                <div className='logo-img-div'>
                  <img src={`http://localhost:4000/uploads/home/hero/${hero.logo_image}`} alt="" />
                </div>
                <h1 className='h1-one'>{hero.heading_one}</h1>
                <h1 className='h1-two'>{hero.heading_two}</h1>
              </div>
            </div>

            <div className="col-lg-7 col-12">
              <img src={`http://localhost:4000/uploads/home/hero/${hero.hero_image}`} className='hero-right-img' alt="" />
            </div>
            
        </div>

        <div className='row mt-5 align-items-center'>
          <div className="col-md-3 col-12">
            <div className=' bottom-image'>
              <img src="/image/home/hero-bottom.png" className='hero-bottom-img' alt="" />
            </div>
          </div>

          <div className="col-md-9 col-12">
            <form className='hero-form' onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  className="hero-form-input"
                  placeholder='Name'
                  name="user_name"
                  value={leadForm.user_name}
                  onChange={handleChange}
                  />
              </div>
              <div>
                <input 
                  type="email" 
                  className="hero-form-input"
                  placeholder='Email'
                  name="email"
                  value={leadForm.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <input 
                  type="text" 
                  className="hero-form-input"
                  placeholder='Company'
                  name="company"
                  value={leadForm.company}
                  onChange={handleChange}
                />
              </div>
              
              <button type="submit" className='hero-send-btn'>Send</button>
            </form>
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
