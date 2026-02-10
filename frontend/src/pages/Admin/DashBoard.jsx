import React from 'react'
import { FaBox, FaRupeeSign, FaShoppingCart, FaUsers } from 'react-icons/fa'

const DashBoard = () => {
  return (
    <div className='admin-dashboard'>
        <h4 className="dashboard-title">Admin Dashboard</h4>

        <div className="dashboard-cards">

            <div className="dashboard-card">
            <div className="card-icon users">
                <FaUsers />
            </div>
            <div>
                <p>Total Users</p>
                <h3>124</h3>
            </div>
            </div>

            <div className="dashboard-card">
            <div className="card-icon orders">
                <FaShoppingCart />
            </div>
            <div>
                <p>Total Orders</p>
                <h3>86</h3>
            </div>
            </div>

            <div className="dashboard-card">
            <div className="card-icon products">
                <FaBox />
            </div>
            <div>
                <p>Total Products</p>
                <h3>45</h3>
            </div>
            </div>

            <div className="dashboard-card">
            <div className="card-icon revenue">
                <FaRupeeSign />
            </div>
            <div>
                <p>Total Revenue</p>
                <h3>₹ 78,500</h3>
            </div>
        </div>

      </div>
    </div>
  )
}

export default DashBoard
