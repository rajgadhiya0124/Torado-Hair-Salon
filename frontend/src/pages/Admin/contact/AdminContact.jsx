import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

const AdminContact = () => {
    const [contacts, setContacts] = useState([]);
    const token = localStorage.getItem("token")


    const fetchContacts = async () => {
        try {
        const res = await axios.get(
            "http://localhost:4000/api/contactus/getall"
        );

        setContacts(res.data.data);

        } catch (error) {
            console.error("Contact fetch error:", error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    // Delete Contact
    const deleteContact = async (id) => {

        if (!window.confirm("Delete this contact message?")) return;

        try {
            await axios.delete(`http://localhost:4000/api/contactus/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchContacts();    

            toast.success("Contact deleted successfully");

        } catch (error) {
            console.error("Delete contact error:", error);
            toast.error("Delete failed");
        }
    };


    return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Contact Inquery</h2>
        </div>

        <div className='admin-page-container'>
            <table className="admin-contact-table">

                <thead>
                <tr>
                    <th>#</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>SUBJECT</th>
                    <th>MESSAGE</th>
                    <th>DATE</th>
                    <th>ACTION</th>
                </tr>
                </thead>

                <tbody>
                {contacts.length > 0 ? (
                    contacts.map((item, index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.subject}</td>
                        <td className="message-cell">
                            {item.message}
                        </td>
                        <td>
                            {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                            <button className='admin-delete-btn' onClick={()=>deleteContact(item.id)}>
                                <BiSolidTrashAlt />
                            </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No messages found</td>
                    </tr>
                )}
                </tbody>

            </table>
        </div>
    </>
  )
}

export default AdminContact
