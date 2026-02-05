import { useState } from 'react'
// import './App.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import ContactUsPage from './pages/ContactUsPage';
import { ToastContainer } from 'react-toastify';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AppointmentPage from './pages/AppointmentPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import BlogRight from './pages/BlogRight';
import BlogLeft from './pages/BlogLeft';
import BlogDetails from './pages/BlogDetails';
import BlogDetailsRight from './pages/BlogDetailsRight';
import ServicePage from './pages/ServicePage';
import ServiceDetails from './pages/ServiceDetails';
import ScrollTop from './components/ScrollTop';
import TeamPage from './pages/TeamPage';
import GalleryPage from './pages/GalleryPage';
import ShopPage from './pages/ShopPage';
import WishListPage from './pages/WishListPage';
import ShopDetailsPage from './pages/ShopDetailsPage';
import CartPage from './pages/CartPage';

function App() {

  return (
    <>
  
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />

      <Navbar />
        <ScrollTop />
        <Routes>
          <Route path='/' element={<HomePage />} />        
          <Route path='/contactus' element={<ContactUsPage />} />        
          <Route path='/register' element={<RegisterPage />} />        
          <Route path='/login' element={<LoginPage />} />        
          <Route path='/appointment' element={<AppointmentPage />} />        
          <Route path='/faq' element={<FaqPage />} /> 

          <Route path='/team' element={<TeamPage />} />  
          <Route path='/gallery' element={<GalleryPage />} />  

          <Route path='/shop' element={<ShopPage />} />  
          <Route path='/shopdetails/:id' element={<ShopDetailsPage />} />

          <Route path='/cart' element={<CartPage />} />
            
          <Route path='/wishlist' element={<WishListPage />} />  
          <Route path='/service' element={<ServicePage />} />  
          <Route path='/service-details/:id' element={<ServiceDetails />} />  

          <Route path='/blog' element={<BlogPage />} />        
          <Route path='/blog-right' element={<BlogRight />} />        
          <Route path='/blog-left' element={<BlogLeft />} />  

          <Route path='/blogdetails/:id' element={<BlogDetails />} />      
          <Route path='/blogdetails/right/:id' element={<BlogDetailsRight />} />      

        </Routes>
      <Footer />
    </>
  )
}

export default App
