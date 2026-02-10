import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { MdOutlineDashboard } from "react-icons/md";
import { FiChevronDown, FiUsers } from "react-icons/fi";
import { LuContactRound } from "react-icons/lu";

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
