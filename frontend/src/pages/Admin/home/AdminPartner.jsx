import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AdminPartner = () => {

    const [partner, setPartner] = useState([]);
    const [partnerImage, setPartnerImage] = useState(null);

    //fetch partner 
    const fetchPartner = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/home/partner/get");
            setPartner(res.data.data);
        } catch (error) {
            console.error("Error While Fetch partner",error);
        }
    }

    useEffect(()=>{
        fetchPartner();
    },[]);

    //create partner
    const handleCreate = async(e)=>{
        e.preventDefault();

        const formData = new FormData();

        formData.append("partner_image", partnerImage);

        try {
            const res = await axios.post("http://localhost:4000/api/home/partner/create",formData,
                {
                    headers:{
                        Authorization : `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );
            toast.success("Partner Added Successfully");
            fetchPartner();
            setPartnerImage(null);

        } catch (error) {
            console.error("Error While create a partner",error);
        }
    }

    // Delete Partner
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        try {
            await axios.delete(`http://localhost:4000/api/home/partner/delete/${id}`,
                {
                    headers:{
                        Authorization: `Beearer ${localStorage.getItem("token")}`
                    }
                }
            );
            fetchPartner();
        } catch (error) {
            console.log("Error While fetch partner",error);
        }
    };

  return (
    <>
        <div className='admin-partner'>
            <h2>Add Partner</h2>

            {/* Add Partner */}
            <form onSubmit={handleCreate} className="partner-form">
                <label>Upload Partner Logo</label>
                <input
                type="file"
                onChange={(e) => setPartnerImage(e.target.files[0])}
                />

                <button type="submit">
                    Add Partner
                </button>
            </form>
        </div>

        <div className='partner-list-content'>
            <h2>Our Partner List</h2>

            <div className="partner-list">
                {partner.map((item) => (
                <div key={item.id} className="partner-card">
                    <img
                        src={`http://localhost:4000/uploads/home/partner/${item.partner_image}`}
                        alt="partner"
                    />
                    <button
                        className="partner-delete-btn"
                        onClick={() => handleDelete(item.id)}
                    >
                        Delete
                    </button>
                </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default AdminPartner
