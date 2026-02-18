import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify"
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineRemoveRedEye } from 'react-icons/md';
import FormateDate from '../../components/FormateDate';
import { TiArrowSync } from 'react-icons/ti';

const AdminOrder = () => {

    const [order,setOrder] = useState([]);
    const [updateModal, setUpdateModal] = useState(false);

    const [viewModal, setViewModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [currentPage , setCurrentPage] = useState(1);
    const itemsPerPage = 8; 

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentOrder = order.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(order.length / itemsPerPage);

    const token = localStorage.getItem("token")

    const fethOrders = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/order/getall");
            setOrder(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Order", error)
        }
    };

    useEffect(()=>{
        fethOrders();
    }, []);

    const handleView = async(id)=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/order/getorderById/${id}`);
            setSelectedOrder(res.data.data);
            setViewModal(true);
        } catch (error) {
            console.error("Error While Fetch orders with item",error);
        }
    }


    const openEditModal = (item)=>{
        setSelectedOrder(item);
        setUpdateModal(true);
    }

    //update order
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:4000/api/order/update/${selectedOrder.id}`,
                {
                    payment_status: selectedOrder.payment_status,
                    order_status: selectedOrder.order_status,
                },
                {headers:{
                    Authorization: `Bearer ${token}`
                }}
            );
            toast.success("order updated")
            setUpdateModal(false);
            fethOrders();
        } catch (error) {
             if (error.response && error.response.data && error.response.data.message) {
                console.log(error.response.data.message); 
            } else {
                alert("Something went wrong!");
            }
            console.log("Error While Update Order" ,error);
        }
    };

    //update order status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/order/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fethOrders();
        } catch (error) {
            console.error("Error while change Order status",error);
        }
    };


    //delete order
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure to delete ?")) return;

        try {
            await axios.delete(`http://localhost:4000/api/order/delete/${id}`,
                {
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                }
            );
            fethOrders();
        } catch (error) {
            console.error("Error While Delete Order ", error);
        }
    };

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Orders Management</h2>
        </div> 

        <div className='admin-order-table-content'>
            <h2>Orders List</h2>

            <table className='admin-order-table'>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Total</th>
                    <th>Payment Status</th>
                    <th>Order Status</th>
                    <th>Payment Method</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Order Details</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {currentOrder.map((item, index) => (
                    <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.first_name} {item.last_name}</td>
                    <td>${item.total_amount}</td>
                    <td>
                        <span className={`payment-status ${item.payment_status}`}>
                            {item.payment_status}
                        </span>
                    </td>

                    <td>
                        <span className={`order-status ${item.order_status}`}>
                            {item.order_status}
                        </span>
                    </td>

                    <td>{item.payment_method}</td>

                    <td>{FormateDate(item.createdAt)}</td>

                    <td>
                        <span className={`admin-badge ${item.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                            {item.status === 1 ? "Active" : "Inactive"}
                        </span>
                        <label className="switch">
                            <span className="status-toggle-icon"
                                    onClick={() => handleStatusChange(item.id)}>
                                <TiArrowSync />
                            </span>
                        </label>
                    </td>

                    <td>
                        <button className='order-details-btn'
                            onClick={()=>handleView(item.id)}
                        >
                            view
                        </button>
                    </td>

                    <td>
                        <div className='admin-action-button'>
                            <button
                                className="admin-edit-btn"
                                onClick={() =>openEditModal(item)}
                            >
                                <IoPencil />
                            </button>
                            <button className='admin-delete-btn' onClick={() => handleDelete(item.id)}>
                                <BiSolidTrashAlt />
                            </button>
                        </div>
                    </td>

                    </tr>
                ))}
                </tbody>
            </table>

            <div className="pagination-wrapper">
                <button 
                    className='admin-pagination-left-btn'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <MdOutlineKeyboardArrowLeft />
                </button>

                {[...Array(totalPages)].map((_,index)=>(
                    <button
                        key={index}
                        className={`admin-pagination-btn ${currentPage === index + 1 ? "active-page" : ""}`}
                        onClick={()=>setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button 
                    className='admin-pagination-right-btn'
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <MdOutlineKeyboardArrowRight />
                </button>
            </div>

            {/* ================= VIEW MODAL ================= */}
            {viewModal && selectedOrder && (
                <div className="order-view-modal-overlay">
                    <div className="order-view-modal">
                        <h3>Order Details</h3>

                        <div className="order-info-grid">
                            <div>
                                <p><strong>Order ID:</strong> #{selectedOrder.order.id}</p>
                                <p><strong>Date:</strong> {FormateDate(selectedOrder.order.createdAt)}</p>
                                <p><strong>Order Status:</strong> 
                                    <span className={`order-status ${selectedOrder.order.order_status}`}>
                                        {selectedOrder.order.order_status}
                                    </span>
                                </p>
                                <p><strong>Payment Status:</strong> 
                                    <span className={`payment-status ${selectedOrder.order.payment_status}`}>
                                        {selectedOrder.order.payment_status}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p><strong>Customer: </strong>  
                                    {selectedOrder.order.first_name}
                                    {selectedOrder.order.last_name}
                                </p>
                                <p><strong>Email:</strong> {selectedOrder.order.email}</p>
                                <p><strong>Phone:</strong> {selectedOrder.order.phone}</p>
                                <p><strong>Company Name:</strong> {selectedOrder.order.company_name}</p>
                            </div>
                        </div>

                        <div className="order-product-table-content">
                            <h2>Order Items</h2>
                            <table className='order-product-table'>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Product</th>
                                        <th>Qty</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {selectedOrder.items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                    <img 
                                        src={`http://localhost:4000/uploads/product/${item.product_image}`} 
                                        style={{width:"40px"}}
                                        alt={item.product_name}
                                    />
                                    </td>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price} </td>
                                    <td>${item.total}</td>
                                </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>

                        <div className="order-total">
                            <h5>Total Amount: ${selectedOrder.order.total_amount}</h5>
                        </div>


                        <div className="view-modal-action">
                            <button
                                className="admin-close-btn"
                                onClick={() =>setViewModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= UPDATE MODAL ================= */}
            {updateModal && selectedOrder && (
                <div className="admin-order-update-overlay">
                    <div className="admin-order-update-modal">
                        <h3>Update Order</h3>

                        <form className='order-update-form' onSubmit={handleUpdate}>
                            <label>Payment Status</label>
                            <select
                                value={selectedOrder.payment_status}
                                onChange={(e) =>
                                    setSelectedOrder({
                                        ...selectedOrder,
                                        payment_status: e.target.value,
                                    })
                                }
                            >
                                <option value="pending">Pending</option>
                                <option value="paid">Paid</option>
                                <option value="failed">Failed</option>
                            </select>

                            <label>Order Status</label>
                            <select
                                value={selectedOrder.order_status}
                                onChange={(e) =>
                                    setSelectedOrder({
                                        ...selectedOrder,
                                        order_status: e.target.value,
                                    })
                                }
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>

                             <div className="update-model-action">
                                <button type="submit" className='admin-update-btn'>
                                    Update
                                </button>

                                <button
                                    type="button"
                                    className="admin-cancel-btn"
                                    onClick={() => setUpdateModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    </>
  )
}

export default AdminOrder
