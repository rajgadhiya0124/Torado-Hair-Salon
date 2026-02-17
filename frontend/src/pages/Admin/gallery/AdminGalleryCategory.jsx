import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FormateDate from '../../../components/FormateDate';
import { TiArrowSync } from 'react-icons/ti';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineRemoveRedEye } from 'react-icons/md';
import { BiSolidTrashAlt } from 'react-icons/bi';

const AdminGalleryCategory = () => {

    const [gallerycategory, setGalleryCategory] = useState([]);

    const [createModal, setCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        category_name: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const token = localStorage.getItem("token");

    //fetch all gallery actegory
    const fetchGallerycategory = async () => {
        const res = await axios.get("http://localhost:4000/api/gallery/category/getall");
        setGalleryCategory(res.data.data);
    };

    useEffect(() => {
        fetchGallerycategory();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCreateCategory = async (e) => {
    e.preventDefault();

        try {
            await axios.post("http://localhost:4000/api/gallery/category/create",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCreateModal(false);
            setFormData({ category_name: "" });
            fetchGallerycategory();

        } catch (error) {
            console.error("Error while creating category", error);
        }
    };


    //update Gallery Cat status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/gallery/category/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchGallerycategory();
        } catch (error) {
            console.error("Error while change Gallery Cat status",error);
        }
    };

    //delete gallery category
    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete(`http://localhost:4000/api/gallery/category/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchGallerycategory();
        } catch (error) {
            console.error("Error While Delete Gallery Category",error);
        }
    }


    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentCategory = gallerycategory.slice(firstIndex,lastIndex);
    const totalPages = Math.ceil(gallerycategory.length / itemsPerPage);

  return (
    <>
    <div className='admin-page-title-content'>
        <h2 className='admin-page-title'>Gallery Category</h2>
    </div>

    <div className="admin-add-btn-wrapper">
        <button
            className="admin-add-btn"
            onClick={() => setCreateModal(true)}
        >
            + Create Category
        </button>
    </div>

    <div className='gallery-cat-table-content'>
        <table className="gallery-cat-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                {currentCategory.map((item, index) => (
                <tr key={item.id}>
                    <td>{firstIndex + index + 1}</td>
                    <td>{item.category_name}</td>
                
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
            
    {/* create modal */}
    {createModal && (
    <div className="gallerycategory-create-overlay">
        <div className="create-gallerycategory-modal">

            <h3>Create Gallery Category</h3>

            <form onSubmit={handleCreateCategory} className='create-gallery-form'>

                <div className="form-group">
                    <label>Category Name</label>
                    <input
                        type="text"
                        name="category_name"
                        value={formData.category_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="update-model-action">
                    <button type="submit" className="admin-create-btn">
                        Create
                    </button>
                    <button
                        type="button"
                        className="admin-cancel-btn"
                        onClick={() => setCreateModal(false)}
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    </div>
    )}
    </>
  )
}

export default AdminGalleryCategory
