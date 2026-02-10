import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <div className='admin-wrapper'>
        <AdminSidebar collapsed={collapsed}/>

        <div className={`admin-main ${collapsed ? "collapsed" : ""}`}>
            <AdminTopbar collapsed={collapsed} setCollapsed={setCollapsed}/>
            <main className='main'>
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default AdminLayout
