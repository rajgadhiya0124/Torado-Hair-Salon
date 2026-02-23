import React, { useState } from 'react'
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { FiUser } from "react-icons/fi";
import { BsBox } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { IoExitOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

const Navbar = () => {  
    const navigate = useNavigate();
    const [showDrawer, setShowDrawer] = useState(false);

    const [open, setOpen] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"))

    const handleLogut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
        navigate("/login")
    }

  return (
    <>
    <section className="navbar-section">
        <div className='navbar-container'>
            <div className='row align-items-center'>
                <div className='nav-logo col-2 '>
                    <Link to={'/'}><img src="/image/navbar/navbar-logo.svg"  alt="" /></Link>
                </div>

                <div className='col-6'>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">

                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav">
                                    <li className="nav-item nav-dropdown">
                                        <a className="nav-link custom-nav-link " href="#">
                                            Home <FiPlus/>
                                        </a>

                                        <ul className='dropdown-menu-custom'>
                                            <li>Home Demo - One</li>
                                            <li>Home Demo - Two</li>
                                            <li>Home Demo - Three</li>
                                        </ul>
                                    </li>

                                    <li className="nav-item nav-dropdown">
                                        <Link to={'aboutus'} className="nav-link custom-nav-link" >
                                            About Us
                                        </Link>
                                    </li>

                                    <li className="nav-item nav-dropdown">
                                        <a className="nav-link custom-nav-link" href="#">
                                            Pages <FiPlus/>
                                        </a>

                                        <ul className='dropdown-menu-custom'>
                                            <li>Pricing</li>
                                            <li>
                                                <Link to={'/team'} className='dropdown-items-link'>
                                                Team</Link>
                                            </li>
                                            <li>
                                                <Link to={'/appointment'} className='dropdown-items-link'>
                                                Make An Appointment</Link>
                                            </li>
                                            <li>
                                                <Link to={'/gallery'} className='dropdown-items-link'>
                                                Gallery</Link>
                                            </li>
                                            <li><Link to={"/faq"} className='dropdown-items-link'>
                                                Faq</Link>
                                            </li>
                                            <li>
                                                <Link to={'/testimonial'} className='dropdown-items-link'>
                                                Testimonilas</Link>
                                            </li>
                                            <li><Link to={"/login"} className='dropdown-items-link'>
                                                My Account </Link>
                                            </li>
                                            <li><Link to={'/wishlist'} className='dropdown-items-link'> 
                                                Wishlist</Link>
                                            </li>
                                            <li>
                                                <Link to={'/privacy'} className='dropdown-items-link'>
                                                Privacy Policy</Link>
                                            </li>
                                            <li><Link to={'/terms&condition'} className='dropdown-items-link'>
                                                Terms & Conditions</Link>
                                            </li>
                                            <li>404 Error Page</li>
                                        </ul>

                                    </li>
                                    <li className="nav-item nav-dropdown">
                                        <a className="nav-link custom-nav-link " href="#">
                                            Services <FiPlus/>
                                        </a>

                                        <ul className='dropdown-menu-custom'>
                                            <li><Link to={"/service"} className='dropdown-items-link'> 
                                                Service</Link>
                                            </li>
                                            <li>Service Details</li>
                                        </ul>
                                    </li>
                                    <li className="nav-item nav-dropdown">
                                        <a className="nav-link custom-nav-link" href="#">
                                            Shop <FiPlus/>
                                        </a>

                                        <ul className='dropdown-menu-custom'>
                                            <li><Link to={'/shop'} className='dropdown-items-link'> 
                                                Shop</Link>
                                            </li>
                                            <li><Link to={'/cart'} className='dropdown-items-link'> 
                                                Shopping Cart</Link>
                                            </li>
                                            <li>
                                                <Link to={'/checkout'} className='dropdown-items-link'>Checkout
                                                </Link>
                                            </li>
                                        </ul>

                                    </li>
                                    <li className="nav-item nav-dropdown">
                                        <a className="nav-link custom-nav-link" href="#">
                                            Blog <FiPlus/>
                                        </a>

                                        <ul className='dropdown-menu-custom'>
                                            <li><Link to={'/blog'} className='dropdown-items-link'>
                                                Blog Grid</Link>
                                            </li>
                                            <li><Link to={'/blog-right'} className='dropdown-items-link'>
                                                Right Sidebar</Link>
                                            </li>
                                            <li><Link to={'/blog-left'} className='dropdown-items-link'>
                                                Left Sidebar</Link>
                                            </li>
                                            {/* <li>Others <FiPlus/> </li>
                                            <li>Single Post <FiPlus/> </li> */}
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/contactus'} className="nav-link custom-nav-link">
                                            Contact Us 
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="col-4">
                    <div className='nav-icon-content'>
                        <button className='search-icon'><IoSearchOutline /></button>
                        <button className='shop-icon'><HiOutlineShoppingBag /></button>
                        <button className='bar-icon' onClick={()=>setShowDrawer(true)}>
                            <HiBars3BottomRight />
                        </button>
                        <button className='shop-icon' onClick={()=>setOpen(!open)}>
                            <FiUser />
                        </button>

                        {open && (
                        <div className="user-dropdown-menu">
                            <Link className="user-dropdown-item">
                                <HiOutlineUser style={{fontSize:"18px"}}/> 
                                {user?.name ? user.name : "Account"}
                            </Link>
                            <Link to={"/user/order"} className="user-dropdown-item">
                                <BsBox style={{fontSize:"18px"}}/> My Orders
                            </Link>

                            <Link to={"/wishlist"} className="user-dropdown-item">
                                <AiOutlineHeart style={{fontSize:"18px"}} /> Wishlist
                            </Link>

                            <Link className="user-dropdown-item" onClick={(e)=>{
                                e.preventDefault();
                                handleLogut();
                            }}>
                                <IoExitOutline style={{fontSize:"18px"}}/> Logout
                            </Link>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div>
        <div
            className={`drawer-overlay ${showDrawer ? "active" : ""}`}
            onClick={() => setShowDrawer(false)}
        >
        </div>  

        <div className={`right-drawer ${showDrawer ? "open" : ""}`}>
        
            <div className="drawer-header">
                <button onClick={() => setShowDrawer(false)}> 
                    <RxCross2 />
                </button>
            </div>

            <h2>Quick Info</h2>

            <div className="drawer-content">
                <div className='drawer-logo'>
                    <img src="/image/navbar/navbar-logo2.svg" alt="" />
                </div>

                <ul className='salon-work-ul'>
                    <li>
                        <span>Working Days</span>
                        <span>9 AM - 9 PM</span>
                    </li>
                    <li>
                        <span>Saturday</span>
                        <span>10 AM - 8 PM</span>
                    </li>
                    <li>
                        <span>Sunday</span>
                        <span>Closed</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar
