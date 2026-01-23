import { useState } from 'react'
// import './App.css'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {Routes,Route} from "react-router-dom"
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer';

function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />           
        </Routes>
      <Footer />
    </>
  )
}

export default App
