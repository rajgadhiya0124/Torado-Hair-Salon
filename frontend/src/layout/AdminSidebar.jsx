import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FiChevronDown, FiUsers } from "react-icons/fi";
import { LuContactRound } from "react-icons/lu";
import { IoCalendarNumber } from "react-icons/io5";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { RiTeamLine } from "react-icons/ri";
import { AiFillProduct } from "react-icons/ai";
import { RiGalleryFill } from "react-icons/ri";
import { MdMiscellaneousServices } from "react-icons/md";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { PiShoppingCartFill } from "react-icons/pi";
import { MdLeaderboard } from "react-icons/md";
import { RiNewspaperLine } from "react-icons/ri";
import { IoHomeOutline } from "react-icons/io5";

const AdminSidebar = ({collapsed }) => {

    const [openDropdown, setOpenDropdown] = useState(false);
    const [open, setOpen] = useState({
        contact: false
    });

    const toggle = (key) => {
        setOpen(prev => ({ ...prev, [key]: !prev[key] }));
    };
  return (
    <aside className={`admin-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className='admin-logo'>
            {!collapsed ? (
                <img src="/image/navbar/navbar-logo.svg" alt="logo" />
            ) : (
               <p></p>
            )}
            {/* <img src="/image/navbar/navbar-logo.svg" alt="" /> */}
        </div>

        <div className='admin-menu'>
            <span className='admin-item-span'>
                <MdOutlineDashboard  className='item-icon'/>

                {!collapsed && (
                    <Link to={'/admin'} className='adminside-item-link'> DashBoard</Link>
                )}
            </span>

            <div className='admin-dropdown'>
                <span className='admin-item-span' onClick={()=>toggle("home")}>
                    <IoHomeOutline  className='item-icon'/>

                    <div className='admin-item-name'>
                        {!collapsed && (
                            <span className='adminside-item-link'> Home </span>
                        )}

                        {!collapsed && (
                            <FiChevronDown
                            className={`dropdown-arrow ${open.home ? "rotate" : ""}`}
                            />
                        )}
                    </div>
                </span>

                {open.home && !collapsed &&(
                    <div className='admin-submenu'>
                        <Link to="home/hero" className='admin-submenu-link'>
                            Hero section
                        </Link>
                        <Link to="home/about" className='admin-submenu-link'>
                            About section
                        </Link>
                        <Link to="home/partner" className='admin-submenu-link'>
                            Partner section
                        </Link>
                    </div>
                )}
            </div>


            <div className='admin-dropdown'>
                <span className='admin-item-span' onClick={()=>toggle("service")}>
                    <MdMiscellaneousServices  className='item-icon'/>

                    <div className='admin-item-name'>
                        {!collapsed && (
                            <span className='adminside-item-link'> Salon Services</span>
                        )}

                        {!collapsed && (
                            <FiChevronDown
                            className={`dropdown-arrow ${open.service ? "rotate" : ""}`}
                            />
                        )}
                    </div>
                </span>

                {open.service && !collapsed &&(
                    <div className='admin-submenu'>
                        <Link to="service" className='admin-submenu-link'>
                            Services
                        </Link>
                        <Link to="service/create" className='admin-submenu-link'>
                            Create Services
                        </Link>
                    </div>
                )}
            </div>

            <div className='admin-dropdown'>
                <span className='admin-item-span' onClick={()=>toggle("blog")}>
                    <LuContactRound  className='item-icon'/>

                    <div className='admin-item-name'>
                        {!collapsed && (
                            <span className='adminside-item-link'> Blogs</span>
                        )}

                        {!collapsed && (
                            <FiChevronDown
                            className={`dropdown-arrow ${open.blog ? "rotate" : ""}`}
                            />
                        )}
                    </div>
                </span>

                {open.blog && !collapsed &&(
                    <div className='admin-submenu'>
                        <Link to="blog/category" className='admin-submenu-link'>
                            Blog Category
                        </Link>
                        <Link to="blog/tag" className='admin-submenu-link'>
                            Blog Tags
                        </Link>
                        <Link to="blog/author" className='admin-submenu-link'>
                            Blog Authors
                        </Link>
                        <Link to="blog" className='admin-submenu-link'>
                            Blog 
                        </Link>
                        <Link to="blog/create" className='admin-submenu-link'>
                            Create Blog 
                        </Link>
                    </div>
                )}
            </div>

            <div className='admin-dropdown'>
                <span className='admin-item-span' onClick={()=>toggle("product")}>
                    <AiFillProduct  className='item-icon'/>

                    <div className='admin-item-name'>
                        {!collapsed && (
                            <span className='adminside-item-link'> Product </span>
                        )}

                        {!collapsed && (
                            <FiChevronDown
                            className={`dropdown-arrow ${open.product ? "rotate" : ""}`}
                            />
                        )}
                    </div>
                </span>

                {open.product && !collapsed &&(
                    <div className='admin-submenu'>
                        <Link to="product/category" className='admin-submenu-link'>
                            Product Category
                        </Link>
                        <Link to="product/tag" className='admin-submenu-link'>
                            Product Tag
                        </Link>
                        <Link to="product" className='admin-submenu-link'>
                            Product
                        </Link>
                        <Link to="product/create" className='admin-submenu-link'>
                            Create Product 
                        </Link>
                        <Link to="product/review" className='admin-submenu-link'>
                            Product Review 
                        </Link>
                    </div>
                )}
            </div>

            <div className='admin-dropdown'>
                <span className='admin-item-span' onClick={()=>toggle("gallery")}>
                    <RiGalleryFill  className='item-icon'/>

                    <div className='admin-item-name'>
                        {!collapsed && (
                            <span className='adminside-item-link'> Gallery </span>
                        )}

                        {!collapsed && (
                            <FiChevronDown
                            className={`dropdown-arrow ${open.gallery ? "rotate" : ""}`}
                            />
                        )}
                    </div>
                </span>

                {open.gallery && !collapsed &&(
                    <div className='admin-submenu'>
                        <Link to="gallery/category" className='admin-submenu-link'>
                            Gallery Category
                        </Link>
                        <Link to="gallery" className='admin-submenu-link'>
                            Gallery Manage
                        </Link>
                    </div>
                )}
            </div>

            <span className='admin-item-span'>
                <PiShoppingCartFill  className='item-icon'/>

                {!collapsed && (
                    <Link to={'orders'} className='adminside-item-link'> Orders </Link>
                )}
            </span>


            <span className='admin-item-span'>
                <RiTeamLine  className='item-icon'/>

                {!collapsed && (
                    <Link to={'team'} className='adminside-item-link'> Team Members</Link>
                )}
            </span>

            <span className='admin-item-span'>
                <RiQuestionAnswerLine  className='item-icon'/>

                {!collapsed && (
                    <Link to={'faq'} className='adminside-item-link'> FAQ</Link>
                )}
            </span>

            <span className='admin-item-span'>
                <IoCalendarNumber  className='item-icon'/>

                {!collapsed && (
                    <Link to={'appointment'} className='adminside-item-link'> Appointment</Link>
                )}
            </span>

            <span className='admin-item-span'>
                <MdLeaderboard  className='item-icon'/>

                {!collapsed && (
                    <Link to={'lead'} className='adminside-item-link'> Lead Inquery</Link>
                )}
            </span>

            <span className='admin-item-span'>
                <RiNewspaperLine  className='item-icon'/>

                {!collapsed && (
                    <Link to={'newsletter'} className='adminside-item-link'> Newsletter</Link>
                )}
            </span>

            <span className='admin-item-span'>
                <MdOutlinePrivacyTip  className='item-icon'/>

                {!collapsed && (
                    <Link to={'privacy-policy'} className='adminside-item-link'> Privacy Policy</Link>
                )}
            </span>

            <span className='admin-item-span'>
                <MdOutlinePrivacyTip  className='item-icon'/>

                {!collapsed && (
                    <Link to={'terms-condition'} className='adminside-item-link'> Terms & Condition</Link>
                )}
            </span>

            <div className='admin-dropdown'>
                <span className='admin-item-span' onClick={()=>toggle("contact")}>
                    <LuContactRound  className='item-icon'/>

                    <div className='admin-item-name'>
                        {!collapsed && (
                            <span className='adminside-item-link'> Contact</span>
                        )}

                        {!collapsed && (
                            <FiChevronDown
                            className={`dropdown-arrow ${open.contact ? "rotate" : ""}`}
                            />
                        )}
                    </div>
                </span>

                {open.contact && !collapsed &&(
                    <div className='admin-submenu'>
                        <Link to="contactinfo" className='admin-submenu-link'>
                            Contact Info
                        </Link>
                        <Link to="contact" className='admin-submenu-link'>
                            Contact Inquery
                        </Link>
                    </div>
                )}
            </div>

            <span className='admin-item-span'>
                <FiUsers  className='item-icon'/>

                {!collapsed && (
                    <Link to="userlist" className='adminside-item-link'> Users</Link>
                )}
            </span>
        </div>
    </aside>  
  )
}

export default AdminSidebar
