import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import FormateDate from '../../components/FormateDate';
import { toast } from 'react-toastify';

const AdminAppointement = () => {

    const [appointments, setAppointments] = useState([]);

    const [selectedAppointment, setSelectedAppointment] = useState(null); //for view modal
    const [viewModal,setViewModal] = useState(false);

    const token = localStorage.getItem("token");

    //fetch appointment
    const fetchAppointments = async () => {
        try {
            const res = await axios.get("http://localhost:4000/api/appointment/getall");
            setAppointments(res.data.data);
        } catch (error) {
            console.log("Error fetching appointments", error);
        }
    };

    useEffect(()=>{
        fetchAppointments();
    },[]);

    const handleView = (appointment) => {
        setSelectedAppointment(appointment);
        setViewModal(true);
    };



    //update appointment status
    const updateStatus = async (id, status) => {
    try {
        await axios.put(`http://localhost:4000/api/appointment/statusupdate/${id}`,{ 
                appointment_status: status,
            },
            {   headers: {
                    Authorization: `Bearer ${token}`
                }   
            }
            );
            fetchAppointments();
        } catch (error) {
            console.log("Error updating appointment status", error);
        }
    };

    //delete appointment
    const deleteAppointment = async(id)=>{
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            const res = await axios.delete(`http://localhost:4000/api/appointment/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchAppointments();
            toast.success("Appointment deleted")
        } catch (error) {
            console.log("Error delete appointments", error);
        }
    }

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Client Appointemt Managment</h2>
        </div>

        <div className='admin-page-container'>
            <table className="admin-appointment-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Persons</th>
                        <th>Date & Time</th>
                        <th>Appointment Status</th>
                        <th>ACTION</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((item,index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.customer_name}</td>
                            <td>{item.customer_email}</td>
                            <td>{item.customer_phone}</td>
                            <td>{item.service_name}</td>
                            <td>{item.persons}</td>
                            <td>{FormateDate(item.appointment_date)} {item.appointment_time}</td>
                            <td>
                                <select
                                    value={item.appointment_status}
                                    onChange={(e) => updateStatus(item.id, e.target.value)}
                                    className={`appointment-status-dropdown status-${item.appointment_status}`}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </td>


                            <td>
                                <div className='admin-action-button'>
                                    <button className='admin-view-btn'
                                        onClick={()=>handleView(item)}
                                    >
                                        <MdOutlineRemoveRedEye />
                                    </button>
                                    <button
                                        className="admin-delete-btn"
                                        onClick={() => deleteAppointment(item.id)}
                                    >
                                        <BiSolidTrashAlt  />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {viewModal && selectedAppointment && (
        <div className="appoinntview-modal-overlay">
            <div className="appointment-view-modal">
                <div className="modal-header">
                    <h3>Appointment Details</h3>
                </div>

                <div className="modal-body">
                    <div className="info-grid">
                        <div>
                            <span className="appoint-view-label">Client Name</span>
                            <span>{selectedAppointment.customer_name}</span>
                        </div>

                        <div>
                            <span className="appoint-view-label">Phone</span>
                            <span>{selectedAppointment.customer_phone}</span>
                        </div>

                        <div>
                            <span className="appoint-view-label">Email</span>
                            <span>{selectedAppointment.customer_email}</span>
                        </div>

                        <div>
                            <span className="appoint-view-label">Persons</span>
                            <span>{selectedAppointment.persons}</span>
                        </div>

                        <div>
                            <span className="appoint-view-label">Date & Time</span>
                            <span>
                                {FormateDate(selectedAppointment.appointment_date)}
                            </span>{" "}
                            <span>
                                {selectedAppointment.appointment_time}
                            </span>
                        </div>

                        <div>
                            <span className="appoint-view-label">Status</span>
                            <span className={`viewmodal-status-badge ${selectedAppointment.appointment_status}`}>
                                {selectedAppointment.appointment_status}
                            </span>
                        </div>
                        </div>

                        <div className="message-box">
                        <span className="appoint-view-label">Message</span>
                        <p>{selectedAppointment.message}</p>
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
        </div>
        )}

    </>
  )
}

export default AdminAppointement
