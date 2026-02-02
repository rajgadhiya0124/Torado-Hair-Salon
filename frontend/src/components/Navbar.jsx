import React from 'react'
import { FiPlus } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <section className="navbar-section">
        <div className='navbar-container'>
            <div className='row align-items-center'>
                <div className='nav-logo col-2 '>
                    <img src="/image/navbar/navbar-logo.svg" alt="" />
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
                                        <a className="nav-link custom-nav-link" href="#">
                                            About Us
                                        </a>
                                    </li>

                                    <li className="nav-item nav-dropdown">
                                        <a className="nav-link custom-nav-link" href="#">
                                            Pages <FiPlus/>
                                        </a>

                                        <ul className='dropdown-menu-custom'>
                                            <li>Pricing</li>
                                            <li>Team</li>
                                            <li>
                                                <Link to={'/appointment'} className='dropdown-items-link'>
                                                Make An Appointment</Link>
                                            </li>
                                            <li>Gallery</li>
                                            <li><Link to={"/faq"} className='dropdown-items-link'>
                                                Faq</Link>
                                            </li>
                                            <li>Testimonilas</li>
                                            <li><Link to={"/login"} className='dropdown-items-link'>
                                                My Account </Link>
                                            </li>
                                            <li>Privacy Policy</li>
                                            <li>Terms & Conditions</li>
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
                                            <li>Shop</li>
                                            <li>Shopping Cart</li>
                                            <li>Checkout</li>
                                            <li>Shop Details</li>
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
                                            <li>Others <FiPlus/> </li>
                                            <li>Single Post <FiPlus/> </li>
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
                        <div className='search-icon'><IoSearchOutline /></div>
                        <div className='shop-icon'><HiOutlineShoppingBag /></div>
                        <div className='bar-icon'><HiBars3BottomRight /></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Navbar
