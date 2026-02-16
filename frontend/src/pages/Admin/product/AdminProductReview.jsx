import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RatingStar from '../../../components/RatingStar';
import FormateDate from '../../../components/FormateDate';
import { TiArrowSync } from 'react-icons/ti';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoPencil } from 'react-icons/io5';
import { BiSolidTrashAlt } from 'react-icons/bi';

const AdminProductReview = () => {

    const [reviews, setReviews] = useState([]);

    const token = localStorage.getItem("token");
    
    const getReviews = async () => {
        const res = await axios.get("http://localhost:4000/api/product/review/getall");
        setReviews(res.data.data);
    };

    useEffect(() => {
        getReviews();
    }, []);

    //delete product review
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/product/review/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            getReviews();
        } catch (error) {
            console.error("Error While Delete Product Review",error)
        }
    }
  return (
    <div className='prductreview-table-content'>
        <table className="productReview-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>User Name</th>
                    <th>Rating</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {reviews.map((item, index) => (
                <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.product_name}</td>
                    <td>{item.user_name}</td>
                    <td>
                        <RatingStar rating={(item.rating)} />
                    </td>
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
                        <div className='admin-action-button'>
                            <button className='admin-view-btn'
                                onClick={()=>handleView(item)}
                            >
                                <MdOutlineRemoveRedEye />
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
    </div>
  )
}

export default AdminProductReview
