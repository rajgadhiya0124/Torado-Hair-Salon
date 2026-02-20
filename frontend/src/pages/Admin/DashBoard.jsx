import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaBlog, FaBox, FaBoxOpen, FaCalendarCheck, FaEnvelopeOpenText, FaHandshake, FaRupeeSign, FaShoppingCart, FaUsers, FaUserTie } from 'react-icons/fa'
import WeeklyAppointmentChart from '../../components/charts/WeeklyAppointmentChart';
import OrderChart from '../../components/charts/OrderChart';
import FormateDate from '../../components/FormateDate';

const DashBoard = () => {

    const [dashboardCount , setDashboardCount] = useState([]);
    const [todayAppointment, settodayAppointment] = useState([]);
    const [recentOrder, setRecentOrder] = useState([]);
    const [recentLeads, setRecentLeads] = useState([]);

    const fetchdashBoardCount = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/dashboard/getCount");
            setDashboardCount(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Dashboard Count",error);
        }
    }

    const fetchTodayAppointment = async()=>{
        try {
            const res= await axios.get("http://localhost:4000/api/dashboard/get/today-appointment");
            settodayAppointment(res.data.data)
        } catch (error) {
            console.error("Error While Fetch Today Appointment",error);
        }
    }

    const fetchRecentOrder = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/dashboard/get/recent-order");
            setRecentOrder(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Recent Order",error);
        }
    }

    const fetchRecentLeads = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/dashboard/get/recent-leads");
            setRecentLeads(res.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        fetchdashBoardCount();
        fetchTodayAppointment();
        fetchRecentOrder();
        fetchRecentLeads();
    },[]);

    const cards = [
    { title: "Blogs", value: dashboardCount.total_blogs, icon: <FaBlog />, className: "card-blue" },
    { title: "Team Members", value: dashboardCount.total_team_members, icon: <FaUserTie />, className: "card-purple" },
    { title: "Appointments", value: dashboardCount.total_appointments, icon: <FaCalendarCheck />, className: "card-green" },
    { title: "Products", value: dashboardCount.total_products, icon: <FaBoxOpen />, className: "card-orange" },
    { title: "Orders", value: dashboardCount.total_orders, icon: <FaShoppingCart />, className: "card-red" },
    { title: "Users", value: dashboardCount.total_users, icon: <FaUsers />, className: "card-cyan" },
    { title: "Leads", value: dashboardCount.total_leads, icon: <FaEnvelopeOpenText />, className: "card-pink" },
    { title: "Newsletter", value: dashboardCount.total_newsletter, icon: <FaEnvelopeOpenText />, className: "card-yellow" },
    { title: "Partners", value: dashboardCount.total_partners, icon: <FaHandshake />, className: "card-teal" },
  ];

  return (
    <>
    <div className='admin-dashboard'>
        <h4 className="dashboard-title">Admin Dashboard</h4>

        <div>
            <div className="dashboard-grid">
                {cards.map((card, index) => (
                    <div className={`dashboard-card ${card.className}`} key={index}>
                        <div className="card-icon">{card.icon}</div>
                        <div className="card-info">
                            <p>{card.title}</p>
                            <h3>{card.value}</h3>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className='chart-container'>
            <div className='chart-content'>
                <WeeklyAppointmentChart />
                <OrderChart />
            </div>
        </div>
                
        <div className='dashboard-table-conten'>
            <div className="dashboard-table-card">
                <h4>Today's Appointments</h4>

                <table className="dashboard-table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>customer_email</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Total Person</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {todayAppointment.length > 0 ? (
                        todayAppointment.map((item, index) => (
                        <tr key={item.id}>
                            <td>#{index + 1}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.customer_email}</td>
                            <td>{item.customer_phone}</td>
                            <td>{item.service_name}</td>
                            <td>{item.persons}</td>
                            <td>
                            <span className={`status ${item.appointment_status}`}>
                                {item.appointment_status}
                            </span>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No appointments today
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="dashboard-table-content">
            <div className="dashboard-table-card">
                <h4>Recent Orders</h4>

                <table className="dashboard-table">
                <thead>
                    <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                    {recentOrder.map((order) => (
                    <tr key={order.id}>
                        <td>#{order.id}</td>
                        <td>{order.first_name} {order.last_name}</td>
                        <td>${order.total_amount}</td>
                        <td>
                        <span className={`payment-status ${order.payment_status}`}>
                            {order.payment_status}
                        </span>
                        </td>
                        <td>
                        <span className={`order-status ${order.order_status}`}>
                            {order.order_status}
                        </span>
                        </td>
                        <td>{FormateDate(order.order_date)}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>

        <div className="dashboard-table-content">
            <div className="dashboard-table-card">
            <h4>Recent Leads</h4>

            <table className="dashboard-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company Name</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>

                <tbody>
                {recentLeads.map((lead) => (
                    <tr key={lead.id}>
                    <td>{lead.user_name}</td>
                    <td>{lead.email}</td>
                    <td>{lead.company}</td>
                    <td>
                        <span className={`lead-badge ${lead.lead_status}`}>
                            {lead.lead_status}
                        </span>
                    </td>
                    <td>{FormateDate(lead.lead_date)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default DashBoard
