import React from 'react'
import { LuSearch } from "react-icons/lu";
import { IoNotifications } from "react-icons/io5";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import { useEffect } from 'react';

const AdminTopbar = ({ collapsed, setCollapsed }) => {
    const navigate = useNavigate();
    const adminData = JSON.parse(localStorage.getItem("user"));

    const handleLogout = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }

    const [notifications, setNotifications] = useState([]);
    const [showNotification, setShowNotification] = useState(false);

    const fetchnotification = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/notification/get");
            setNotifications(res.data.data);

        } catch (error) {
            console.error("Error While Fetch Notification", error);
        }
    }

    useEffect(()=>{
       fetchnotification();
    },[]);

    const filterNotification = notifications.filter(   //show unread notification
        item => item.is_read === 0
    );

    //set notification is_read === 0 that read by admin
    const MarkAsRead = async(id)=>{
        try {
            await axios.put(`http://localhost:4000/api/notification/read/${id}`);
            fetchnotification();
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    }
 
    const unreadCount = notifications.filter(n => n.is_read === 0).length;


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

            <div className='notification-bar' onClick={()=>setShowNotification(!showNotification)}>
                <IoNotifications className='notification-icon' />

                {unreadCount > 0 &&(
                    <span className='notification-badge'>{unreadCount}</span>
                )}
            </div>

            {showNotification && (
                <div className="notification-dropdown">
                    <h4>Notifications</h4>

                    {filterNotification.length === 0 ? (
                        <p className="no-notification">No Notifications</p>
                    ) : (
                        filterNotification.map((item, index) => (
                            <>
                            <div key={index} 
                                className={`notification-item ${item.is_read === 0 ? "unread" : ""}`}
                                onClick={()=> {MarkAsRead(item.id);

                                    if(item.type === "order"){
                                        navigate(`/admin/orders`)
                                    }
                                    if (item.type === "appointment") {
                                        navigate(`/admin/appointment`);
                                    }

                                    if (item.type === "lead") {
                                        navigate(`/admin/lead`);
                                    }

                                    if (item.type === "newsletter") {
                                        navigate(`/admin/newsletter`);
                                    }
                                }}
                            >
                                <p className="notification-title">{item.title}</p>
                                <p className="notification-message">{item.message}</p>
                                <span className='notification-time'>
                                    {new Date(item.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            </>
                        ))
                    )}
                </div>
            )}


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
