import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoHomeOutline } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

const OrderDetailsPage = () => {

    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);
    const token = localStorage.getItem("token"); 


     const fetchOrderDetails = async () => {
        try {
        const res = await axios.get(`http://localhost:4000/api/order/get/orderDetails/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        setOrder(res.data.order);
        setItems(res.data.items);

        } catch (error) {
            console.error("Error While Fetch Orderdetails",error);
        }
    };

    useEffect(()=>{
        fetchOrderDetails();
    },[]);

  return (
    <section className="orderdetails-page-section">
        <section className="containers">
            <div className='order-details-title'>
                <h2 className='order-detils-h2'>Order Details</h2>
            </div>

            {order && (  
            <div className="order-summary-card">
                <div className="summary-row">
                    <span>Order ID:</span>
                    <strong>{order.id}</strong>
                </div>

                <div className="summary-row">
                    <span>Order Date:</span>
                    <strong>{new Date(order.createdAt).toLocaleDateString()}</strong>
                </div>

                <div className="summary-row">
                    <span>Total Amount:</span>
                    <strong className="price">₹{order.total_amount}</strong>
                </div>

                <div className="summary-row">
                    <span>Order Status:</span>
                    <span className={`order-status-badge ${order.order_status.toLowerCase()}`}>
                        {order.order_status}
                    </span>
                </div>

                <div className="summary-row">
                    <span>Payment Method:</span>
                    <span className={`payment-method-badge ${order.payment_method.toLowerCase()}`}>
                        {order.payment_method}
                    </span>
                </div>
                <div className="summary-row">
                    <span>Payment Status:</span>
                    <span className={`payment-status-badge ${order.payment_status.toLowerCase()}`}>
                        {order.payment_status}
                    </span>
                </div>
            </div>
            )}

            <div>
                <h3 className='order-detila-titles'>Delivery Details</h3>
                {order &&(
                    <div className="address-card">

                        <span className='d-flex gap-2 align-items-baseline mb-3'>
                            <IoHomeOutline style={{fontSize:"16px"}}/> 
                            {order.address} {order.city}, <br />
                            {order.state} - {order.zip}, {order.country} .
                        </span>

                        <span className='d-flex gap-2 align-items-center'>
                            <FiUser style={{fontSize:"16px"}} /> 
                            {order.first_name} {order.last_name} {order.phone}
                        </span>
                    </div>
                )}
            </div>

            <div>
                <h3 className='order-detila-titles'>Ordered Items</h3>

                <div className="items-card">
                    {items.map((item) => (
                        <div key={item.id} className="item-row">
                            <img src={`http://localhost:4000/uploads/product/${item.product_image}`} 
                                style={{width:"50px", height:"100px", objectFit:"fill"}}
                                alt={item.product_name} 
                            />

                            <div className="item-details">
                                <h4 >{item.product_name}</h4>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: ${item.price}</p>
                            </div>

                            <div className="item-total">
                                ${item.quantity * item.price}
                            </div>
                        </div>
                    ))}

                    {order &&(
                    <div className='order-total-ammount'>
                        <span style={{fontWeight:"700"}}>Total Ammount:</span>   
                        <span style={{fontWeight:"700"}}> ${order.total_amount} </span>
                    </div>
                    )}
                </div>
            </div>
        </section>
    </section>
  )
}

export default OrderDetailsPage
