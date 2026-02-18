import React from 'react'
import { LuSearch } from "react-icons/lu";

import { HiBars3BottomLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const AdminTopbar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const adminData = JSON.parse(localStorage.getItem("user"));

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }

  return (
    <div className='admin-topbar'>
        <div className='topbar-left'>
            <button
                className="bar-toggle-btn"
                onClick={() => setCollapsed(!collapsed)}
            >
                <HiBars3BottomLeft />
            </button>

            <div className="admin-search">
                <LuSearch/>
                <input
                    type="text"
                    placeholder="Search..."
                />
            </div>
        </div>  

        <div className='topbar-right'>
            <div className="admin-hover-wrapper">
                <div className='admin-info'>
                    <div className="admin-avatar-letter">
                        {adminData?.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="admin-details">
                        <p className="admin-name">{adminData?.name}</p>
                        <p className="admin-email">{adminData?.email}</p>
                    </div>
                </div>

                <div className="admin-dropdown-button">
                    <button onClick={handleLogout} className='a-logout-btn'>Logout</button>
                </div>
            </div>
        </div>

    </div>  
  )
}

export default AdminTopbar
