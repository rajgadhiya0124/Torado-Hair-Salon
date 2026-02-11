import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiSolidTrashAlt } from 'react-icons/bi';
import { IoPencil } from 'react-icons/io5';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { toast } from 'react-toastify';

const AdminFaq = () => {

    const [faq, setFaq] = useState([]);
    const [faqform, setFaqForm] = useState({
        question:"",
        answer:""
    }); 

    const [editId, setEditId] = useState(null);
    const [EditModal, setEditModal] = useState(false);

    const token = localStorage.getItem("token"); 

    //fetch all faq
    const fetchFaq = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/faq/getall");
            setFaq(res.data.data);
        } catch (error) {
            console.error("Error While fetch FAQ",error);
        }
    }

    useEffect(()=>{
        fetchFaq();
    },[]);

    const handleChange = (e)=>{
        setFaqForm({
            ...faqform,
            [e.target.name]: e.target.value
        })
    }

    //create faq
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/faq/create",faqform,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            setFaqForm({ question:"", answer:""});
            toast.success("Faq Created");
            fetchFaq();
        } catch (error) {
            console.error("Error While Create FAQ",error);
            toast.error("Faq Create Error")
        }
    }

    const openEditModel = (item)=>{
        setEditId(item.id)
        setFaqForm({
            question: item.question,
            answer: item.answer
        });
        setEditModal(true);
    }

    //update edit model
    const handleUpdate = async (e) => {
    e.preventDefault();

    try {
            await axios.put(`http://localhost:4000/api/faq/update/${editId}`,faqform,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );

            toast.success("FAQ Updated");
            setEditModal(false);
            setFaqForm({ question: "", answer: "" });
            fetchFaq();
        } catch (error) {
            console.error("Error While Update FAQ", error);
            toast.error("FAQ Update Error");
        }
    };

    //delete faq
    const handleDelete = async(id)=>{
        if(!window.confirm("Are You Sure To Delete")) return;

        try {
            const res = await axios.delete(`http://localhost:4000/api/faq/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchFaq();
            toast.success("Faq Deleted");
        } catch (error) {
            console.error("Error While Delete FAQ",error);
            toast.error("Faq Deleted Error")
        }
    }

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>FAQ Managment</h2>
        </div>

        <div className='admin-faq-form-content'>
             <form onSubmit={handleSubmit} className="faq-form">
                <input
                    type="text"
                    placeholder="Enter Question"
                    name='question'
                    value={faqform.question}
                    onChange={handleChange}
                    required
                />

                <textarea
                    placeholder="Enter Answer"
                    name='answer'
                    value={faq.answer}
                    onChange={handleChange}
                    required
                />

                <button type="submit" className='add-faq-button'>Add FAQ</button>
            </form>
        </div>

        <div className='admin-faq-table-content'>
            <h2>Faq List</h2>
            <table className="admin-faq-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {faq.map((item,index) => (
                    <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.question}</td>
                        <td>{item.answer.substring(0,80)}...</td>
                        <td>
                            <div className='admin-action-button'>
                                <button
                                    className="admin-edit-btn"
                                    onClick={() =>openEditModel(item)}
                                >
                                    <IoPencil />
                                </button>
                                <button className='admin-delete-btn' onClick={() => handleDelete(item.id)}>
                                    <BiSolidTrashAlt  />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        {EditModal && (
        <div className="faq-editmodal-overlay">
            <div className="faq-edit-modal">
                <div className="modal-header">
                    <h3 className='edit-model-h3'>Update FAQ</h3>
                </div>

                <form onSubmit={handleUpdate} className="faq-form">
                    <div>
                        <label htmlFor="">Question</label>
                        <input
                            type="text"
                            name="question"
                            value={faqform.question}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Answer</label>
                        <textarea
                            name="answer"
                            rows={8}
                            value={faqform.answer}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='update-model-action'>
                        <button className='admin-update-btn'
                            onClick={()=>handleUpdate(item)}
                        >
                            Update
                        </button>
                        <button className='admin-cancel-btn' 
                            onClick={()=>setEditModal(false)}>
                            cancel
                        </button>
                    </div>
                    
                </form>
                </div>
            </div>
            )}

    </>
  )
}

export default AdminFaq
