import { useState } from 'react'
// import './App.css'
import './style.css'
import './admin.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes,Route, useLocation} from "react-router-dom"
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
import CheckoutPage from './pages/CheckoutPage';
import PrivacyPolicy from './pages/privacyPolicy';
import Testimonial from './pages/TestimonialPage';
import TestimonialPage from './pages/TestimonialPage';
import TermsPage from './pages/TermsPage';
import AdminLayout from './layout/AdminLayout';
import AdminUserList from './pages/Admin/AdminUserList';
import DashBoard from './pages/Admin/DashBoard';
import AdminContact from './pages/Admin/contact/AdminContact';
import AdminContactInfo from './pages/Admin/contact/AdminContactInfo';

function App() {
    const location = useLocation();

    const isAdminRoute = location.pathname.startsWith("/admin")
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

      {!isAdminRoute && <Navbar />}

      {/* <Navbar /> */}
        <ScrollTop />
        <Routes>
          <Route path='/' element={<HomePage />} />        
          <Route path='/contactus' element={<ContactUsPage />} />        
          <Route path='/register' element={<RegisterPage />} />        
          <Route path='/login' element={<LoginPage />} />        
          <Route path='/appointment' element={<AppointmentPage />} />        
          <Route path='/faq' element={<FaqPage />} /> 
          <Route path='/testimonial' element={<TestimonialPage />} /> 
          <Route path='/privacy' element={<PrivacyPolicy />} />  
          <Route path='/terms&condition' element={<TermsPage />} />  
          <Route path='/wishlist' element={<WishListPage />} />  

          <Route path='/team' element={<TeamPage />} />  
          <Route path='/gallery' element={<GalleryPage />} />  

          <Route path='/shop' element={<ShopPage />} />  
          <Route path='/shopdetails/:id' element={<ShopDetailsPage />} />

          <Route path='/cart' element={<CartPage />} />
          <Route path='/checkout' element={<CheckoutPage />} />
            
          <Route path='/service' element={<ServicePage />} />  
          <Route path='/service-details/:id' element={<ServiceDetails />} />  

          <Route path='/blog' element={<BlogPage />} />        
          <Route path='/blog-right' element={<BlogRight />} />        
          <Route path='/blog-left' element={<BlogLeft />} />  

          <Route path='/blogdetails/:id' element={<BlogDetails />} />      
          <Route path='/blogdetails/right/:id' element={<BlogDetailsRight />} />      


          <Route path='/admin' element={<AdminLayout /> }>
            <Route index element={<DashBoard />} />
            <Route path='userlist' element={<AdminUserList />} />

            <Route path='contact' element={<AdminContact />} />
            <Route path='contactinfo' element={<AdminContactInfo />} />
          </Route>

        </Routes>
      {/* <Footer /> */}

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
