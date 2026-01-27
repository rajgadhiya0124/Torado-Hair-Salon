import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const RegisterPage = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        terms: false
    });
    const [message, setMessage] = useState('');

    const handlChange =(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if (!formData.terms) {
            setMessage('Please accept Terms & Conditions');
            return;
        }
        try {
            const res = await axios.post("http://localhost:4000/api/user/register",formData);

            if(res.data.success){
                toast.success(res.data.message);
                setMessage(res.data.message);

                setTimeout(()=>{
                    navigate('/login')
                },2500);
                
            }else{
                setMessage(res.data.message || 'Registration failed');
            }

            setFormData({
                name:"",
                email:"",
                password:"",
                confirm_password:"",
                terms:false
            })
        } catch (error) {
            console.error("Error While Register",error);
            setMessage(error.response?.data?.message)
            toast.error(error.response?.data.message);
        }
    }
  return (
    <>
    <section className="register-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>My Account</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Register</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/register/register-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
        </section>
    </section>

    <section className="register-page-section">
        <section className="containers">
            <div className='register-title'>
                <h3>Create An Account</h3>
            </div>

            <div className="register-content">
            
                <form action="" className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handlChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handlChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handlChange}
                        required
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handlChange}
                        required
                    />  
                    
                    
                    <div className="form-check">
                        <input className="form-check-input" 
                            type="radio" 
                            name="terms" 
                            id="terms" 
                            checked={formData.terms}
                            onChange={(e)=>
                                setFormData({...formData,terms: e.target.checked})
                            }
                        />
                        <label className="form-check-label" htmlFor='terms'>
                           I accept the Terms and Conditions
                        </label>
                    </div>

                    {message && <p className="form-message">{message}</p>}

                    <button type='submit' className='register-btn'>Register Now</button>

                    <div className='login-page-navigate'>Already Have An Account? 
                        <Link to={'/login'} className='login-link'> Login </Link></div>
                </form>
                
            </div>
        </section>
    </section>
    </>
  )
}

export default RegisterPage
