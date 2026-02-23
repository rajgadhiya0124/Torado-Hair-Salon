import React, { useEffect, useState } from 'react'
import axios from  "axios"
import { Link, useNavigate } from 'react-router-dom';

const UserOrderPage = () => {
    const navigate = useNavigate();

    const [orders,setOrders] = useState([]);

    const token = localStorage.getItem("token");

    const fetchOrders = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/order/get/userorder",
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setOrders(res.data.data)
        } catch (error) {
            console.error("Error While Fetch orderlist",error);
        }
    }

    useEffect(()=>{
        fetchOrders();
    },[]);

  return (
    <>
     <section className="chekout-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Order List</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Order list</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/chekout/checkout-baneer.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className='orderlist-page-section'>
        <section className="containers">
            <div className='my-order-title'>
                <h2>My Orders</h2>
            </div>
                {orders.length === 0 ? (
                    <p>No Order Place...</p>
                ):(
                orders.map((order) => (
                    <div key={order.id} className="order-card">
                        <p>Order No: {order.order_id}</p>
                        <p>Total: ₹{order.total_amount}</p>
                        <p>Order Status: {order.order_status}</p>
                        <p>Payment Status: {order.payment_status}</p>
                        <p>Order Status: {order.order_status}</p>

                        <button onClick={() => navigate(`/order/details/${order.order_id}`)}>
                            View Details
                        </button>
                    </div>
                ))
                )}
             {/* {orders.map((order) => (
                <div key={order.id} className="order-card">
                    <p>Order No: {order.order_id}</p>
                    <p>Total: ₹{order.total_amount}</p>
                    <p>Order Status: {order.order_status}</p>
                    <p>Payment Status: {order.payment_status}</p>
                    <p>Order Status: {order.order_status}</p>

                    <button onClick={() => navigate(`/order/details/${order.order_id}`)}>
                        View Details
                    </button>
                </div>
            ))} */}
        </section>
    </section>
    </>
  )
}

export default UserOrderPage
