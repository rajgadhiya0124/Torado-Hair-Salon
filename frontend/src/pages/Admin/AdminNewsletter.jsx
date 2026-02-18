import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FormateDate from '../../components/FormateDate';
import { TiArrowSync } from 'react-icons/ti';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const AdminNewsletter = () => {

    const [subscriber, setSubscriber] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentSubscriber = subscriber.slice(firstIndex,lastIndex);
    const totalPages = Math.ceil(subscriber.length / itemsPerPage)

    const token = localStorage.getItem("token");

    //fetch newsletter
    const fetchSubscribers  = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/newsletter/getall");
            setSubscriber(res.data.data);
        } catch (error) {
            console.log("Error While Fetch subascriber",error);
        }
    }

    useEffect(()=>{
        fetchSubscribers();
    },[]);

    //delete subacriber
    const handleDelete = async(id)=>{
        if(!window.confirm("Aare you Sure")) return;
        try {
            await axios.delete(`http://localhost:4000/api/newsletter/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            ) 
            fetchSubscribers();
        } catch (error) {
            console.error("Error While Delete subscriber",error);
        }
    }

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Newsletter Subscriber</h2>
        </div> 

        <div className="admin-subscriber-table-content">
            <table className="subascriber-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Email</th>
                    <th>Created</th>
                    <th>Status</th>
                    <th>Action</th>
            </tr>
            </thead>

            <tbody>
            {currentSubscriber.map((item , index) => (
                <tr key={item.id}>
                <td>{firstIndex + index + 1 }</td>
                <td>{item.email}</td>

                <td>
                    {FormateDate(item.createdAt)}
                </td>

                <td>
                    <span className={`admin-badge ${item.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                        {item.status === 1 ? "Active" : "Inactive"}
                    </span>
                    <label className="switch">
                        {/* <span className="status-toggle-icon"
                            onClick={() => handleStatusChange(item.id)}>
                            <TiArrowSync />
                        </span> */}
                    </label>
                </td>

                <td>
                    <div className='admin-action-button'>
                        <button className='admin-delete-btn' onClick={() =>handleDelete(item.id)}>
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
    </>
  )
}

export default AdminNewsletter
