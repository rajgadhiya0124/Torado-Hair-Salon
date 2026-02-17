import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RatingStar from '../../../components/RatingStar';
import FormateDate from '../../../components/FormateDate';
import { TiArrowSync } from 'react-icons/ti';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoPencil } from 'react-icons/io5';
import { BiSolidTrashAlt } from 'react-icons/bi';

const AdminProductReview = () => {

    const [reviews, setReviews] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewReview, setViewReview] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const token = localStorage.getItem("token");
    
    const getReviews = async () => {
        const res = await axios.get("http://localhost:4000/api/product/review/getall");
        setReviews(res.data.data);
    };

    useEffect(() => {
        getReviews();
    }, []);

    const handleView = (review) => {
        setViewReview(review);
        setShowViewModal(true);
    };

    //update blog status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/product/review/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            getReviews();
        } catch (error) {
            console.error("Error while change Product Review status",error);
        }
    };


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

    const filterReview = reviews.filter((item)=>{
        const term = searchTerm.toLowerCase();
        return(
            item.user_name.toLowerCase().includes(term) ||
            item.product_name.toLowerCase().includes(term)
        ) 
    })

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    
    const currentItems = filterReview.slice(firstIndex,lastIndex); 
    const totalPages = Math.ceil(filterReview.length / itemsPerPage);

  return (
    <>
    <div className='prductreview-table-content'>

        <div className="admin-review-header">
            <h2>Product Reviews</h2>

            <input
                type="text"
                placeholder="Search by user or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="admin-search-input"
            />
        </div>

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
                {currentItems.map((item, index) => (
                <tr key={item.id}>
                    <td>{firstIndex + index + 1}</td>
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
    </div>

    {showViewModal && viewReview && (
        <div className="review-modal-overlay">
            <div className="review-modal">

            <div className="product-review-modal-header">
                <h3>Review Details</h3>
            </div>

            <div className="review-content">

                <div className="info-group">
                    <label>Product</label>
                    <p>{viewReview.product_name}</p>
                </div>

                <div className="info-group">
                    <label>User</label>
                    <p>{viewReview.user_name}</p>
                </div>

                <div className="info-group">
                    <label>Email</label>
                    <p>{viewReview.user_email}</p>
                </div>

                <div className="info-group">
                    <label>Rating</label>
                    <div className="rating-wrapper">
                        <RatingStar rating={viewReview.rating} />
                    </div>
                </div>

                <div className="info-group">
                    <label>Status</label>
                    <span className={`status-badge ${viewReview.status === 1 ? "active" : "inactive"}`}>
                        {viewReview.status === 1 ? "Active" : "Deactive"}
                    </span>
                </div>

                <div className="info-group full">
                    <label>Comment</label>
                    <div className="comment-box">
                        {viewReview.review_message}
                    </div>
                </div>

                <div className="info-group">
                    <label>Date</label>
                    <p>{new Date(viewReview.createdAt).toLocaleString()}</p>
                </div>

            </div>

            <div className="modal-footer">
                <button 
                    className="admin-close-btn"
                    onClick={() => setShowViewModal(false)}
                >
                Close
                </button>
            </div>

            </div>
        </div>
        )}
    </>
  )
}

export default AdminProductReview
