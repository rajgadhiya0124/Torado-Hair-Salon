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
        <Routes>
          <Route path='/' element={<HomePage />} />        
          <Route path='/contactus' element={<ContactUsPage />} />        
          <Route path='/register' element={<RegisterPage />} />        
          <Route path='/login' element={<LoginPage />} />        
          <Route path='/appointment' element={<AppointmentPage />} />        
          <Route path='/faq' element={<FaqPage />} />        

        </Routes>
      <Footer />
    </>
  )
}

export default App
