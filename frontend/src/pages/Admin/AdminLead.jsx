import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FormateDate from '../../components/FormateDate';
import { IoPencil } from 'react-icons/io5';
import { BiSolidTrashAlt } from 'react-icons/bi';
import { TiArrowSync } from 'react-icons/ti';

const AdminLead = () => {

    const [lead, setLead] = useState([]);

    //fetch leads
    const fetchLeads = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/leadform/getAll");
            setLead(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Lead data",error);
        }
    };

    useEffect(()=>{
        fetchLeads();
    },[]);

    //update lead status
    const handleUpdatelead = async(id, newStatus)=>{
        try {
            await axios.put(`http://localhost:4000/api/leadform/update/${id}`,
                { lead_status : newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            fetchLeads();
        } catch (error) {
            console.error("Error While Update Lead data",error);
        }
    }

    //update lead toogle staus
    const handleStatusChange = async(id)=>{
        try {
            await axios.put(`http://localhost:4000/api/leadform/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            );
            fetchLeads();
        } catch (error) {
            console.error("Error while change Lead status",error);
        }
    }

    //delete lead
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/leadform/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            fetchLeads();
        } catch (error) {
            console.error("Error While Update Lead data",error);
        }
    }

  return (
    <>
    <div className='admin-page-title-content'>
        <h2 className='admin-page-title'>Lead Inquery Management</h2>
    </div> 

    <div className="admin-lead-table-content">
        <table className="admin-lead-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Client Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Lead Status</th>
              <th>Created</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {lead.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.user_name}</td>
                <td>{item.email}</td>
                <td>{item.company}</td>
                <td>
                  <select
                    className={`lead-select ${item.lead_status}`}
                    value={item.lead_status}
                    onChange={(e) =>
                      handleUpdatelead(item.id, e.target.value)
                    }
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
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
    </>
  )
}

export default AdminLead
