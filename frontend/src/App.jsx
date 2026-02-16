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
import AdminAppointement from './pages/Admin/AdminAppointement';
import AdminFaq from './pages/Admin/AdminFaq';
import AdminTeam from './pages/Admin/team/AdminTeam';
import AdminRoute from './routes/AdminRoute';
import AdminBlogcategory from './pages/Admin/blog/AdminBlogcategory';
import AdminBlogTag from './pages/Admin/blog/AdminBlogTag';
import AdminblogAuthor from './pages/Admin/blog/AdminblogAuthor';
import AdminBlog from './pages/Admin/blog/AdminBlog';
import AdminCreateBlog from './pages/Admin/blog/AdminCreateBlog';
import AdminService from './pages/Admin/hairservice/AdminService';
import AdminServiceCreate from './pages/Admin/hairservice/AdminServiceCreate';
import AdminProductCategory from './pages/Admin/product/AdminProductCategory';
import AdminProductTag from './pages/Admin/product/AdminProductTag';
import AdminProduct from './pages/Admin/product/AdminProduct';
import AdminProductCreate from './pages/Admin/product/AdminProductCreate';
import AdminProductReview from './pages/Admin/product/AdminProductReview';

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
          <Route path='/blogdetails/right' element={<BlogDetailsRight />} />      


          <Route 
            path='/admin' 
            element={
              <AdminRoute>
                <AdminLayout /> 
              </AdminRoute>
          }>
            <Route index element={<DashBoard />} />

            <Route path='blog/category' element={<AdminBlogcategory />} />
            <Route path='blog/tag' element={<AdminBlogTag />} />
            <Route path='blog/author' element={<AdminblogAuthor />} />
            <Route path='blog' element={<AdminBlog />} />
            <Route path='blog/create' element={<AdminCreateBlog />} />

            <Route path='service' element={<AdminService />} />
            <Route path='service/create' element={<AdminServiceCreate />} />

            <Route path='product' element={<AdminProduct />} />
            <Route path='product/category' element={<AdminProductCategory />} />
            <Route path='product/tag' element={<AdminProductTag />} />
            <Route path='product/create' element={<AdminProductCreate />} />
            <Route path='product/review' element={<AdminProductReview />} />

            <Route path='team' element={<AdminTeam />} />
            <Route path='faq' element={<AdminFaq />} />
            <Route path='appointment' element={<AdminAppointement />} />
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
