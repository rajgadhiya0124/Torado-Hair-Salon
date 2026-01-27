import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const LoginPage = () => {
    
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const [message, setMessage] = useState('');


    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                'http://localhost:4000/api/user/login',
                {
                    email: formData.email,
                    password: formData.password
                }
            );

            if (res.data.success) {
                toast.success('Login successful');

                if (res.data.token) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('user',JSON.stringify(res.data.user));
                }

                setTimeout(() => navigate('/'), 1500);
            } else {
                setMessage(res.data.message || 'Login failed');
                toast.error(res.data.message || 'Login failed');
            }
            console.log("Login response:", res.data);

        } catch (error) {
            console.error("Error While login",error)
            const backendMessage =
                error.response?.data?.message || 'Invalid email or password';

            setMessage(backendMessage);
            toast.error(backendMessage);
        }
    };

  return (
    <>
     <section className="login-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>My Account</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Login</span>
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

    <section className="login-page-section">
        <section className="containers">
            <div className='login-title'>
                <h3>Log In To Your Account</h3>
            </div>

            <div className="login-content">

                <form action="" className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <div className="login-raido-forget">
                        <div>
                            <input 
                                className="form-check-input" 
                                type="checkbox" 
                                name="remember"
                                id="remember" 
                                checked={formData.remember}
                                onChange={(e) =>
                                    setFormData({ ...formData, remember: e.target.checked })
                                }
                            />{' '}
                            <label className="form-check-label" htmlFor="remember">
                                Remember me
                            </label>
                        </div>

                        <Link className='forget-link'>Forgot your password?</Link>
                    </div>

                    {message && <p className="form-message">{message}</p>}

                    <button type='submit' className='login-btn'>Log In</button>

                    <div className='login-page-navigate'>Don't Have An Account? {" "}
                        <Link to={'/register'} className='register-link'>Register</Link></div>
                </form>
                
            </div>
        </section>
    </section>
    </>
  )
}

export default LoginPage
