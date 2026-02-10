import React from 'react'
import { LuSearch } from "react-icons/lu";

import { HiBars3BottomLeft } from "react-icons/hi2";

const AdminTopbar = ({ collapsed, setCollapsed }) => {
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

        </div>

    </div>  
  )
}

export default AdminTopbar
