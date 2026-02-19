import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { BiSolidTrashAlt } from 'react-icons/bi'
import { IoPencil } from 'react-icons/io5'
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight, MdOutlineRemoveRedEye } from 'react-icons/md'
import { TiArrowSync } from 'react-icons/ti'
import FormateDate from '../../../components/FormateDate'
import RatingStar from '../../../components/RatingStar'

const AdminProduct = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [productCategory, setProductcategory] = useState([]);
    const [productTag, setProductTag] = useState([]);

    const [showViewModal, setShowViewModal] = useState(false);
    const [viewData, setViewData] = useState(null);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editData, setEditData] = useState({
        id:"",
        category_id :"",
        tag_id:"",
        product_name:"",
        product_image: null,
        price:"",
        discount_price:"",
        product_description:"",
        additional_information:"",
        stock:""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const currentPrduct = products.slice(firstIndex,lastIndex);
    const totalPages = Math.ceil(products.length / itemsPerPage)

    const token = localStorage.getItem("token");

    //fetch all Product
    const fetchproduct = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/getAll");
            setProducts(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Blogs",error);
        }
    }

    //fetch product category
    const fetchProductCategory = async()=>{
            const res = await axios.get("http://localhost:4000/api/product/category/getall");
            const Activecategory = res.data.data.filter(
                (item)=> item.status === 1
            );
            setProductcategory(Activecategory);
    }
    //fetch product tag
    const fetchProductTag = async()=>{
        const res = await axios.get("http://localhost:4000/api/product/tag/getall");
        const ActiveTag = res.data.data.filter(
            (item)=> item.status === 1
        );
        setProductTag(ActiveTag);
    }

    useEffect(()=>{
        fetchproduct();
        fetchProductCategory();
        fetchProductTag();
    },[]);

    const handleView = (product) => {
        setViewData(product);
        setShowViewModal(true);
    };

    const openEditModal = (item)=>{
        setEditData({
            id:item.id,
            category_id: item.category_id,
            tag_id: item.tag_id,
            product_name: item.product_name,
            product_image: item.product_image,
            price: item.price,
            discount_price: item.discount_price,
            product_description: item.product_description,
            additional_information:item.additional_information,
            stock: item.stock
        });
        setShowEditModal(true)
    }

    const handleEditChange = (e)=>{
        const { name, value, files } = e.target;

        if (name === "product_image") {
            setEditData({ ...editData, product_image: files[0] });
        } else {
            setEditData({ ...editData, [name]: value });
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault(); 
        try {
            const formData = new FormData();

            formData.append("category_id", editData.category_id);
            formData.append("tag_id", editData.tag_id);
            formData.append("product_name", editData.product_name);
            formData.append("price", editData.price);
            formData.append("discount_price", editData.discount_price);
            formData.append("product_description", editData.product_description);
            formData.append("additional_information", editData.additional_information);
            formData.append("stock", editData.stock);

            if (editData.product_image instanceof File) {
                formData.append("product_image", editData.product_image);
            }

            await axios.put(`http://localhost:4000/api/product/update/${editData.id}`,formData,
                { 
                    headers: { 
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data" 
                    } }
            );
            fetchproduct();
            setEditData({id:"",category_id :"",tag_id:"",product_name:"",product_image: null,price:"",
                discount_price:"",product_description:"",additional_information:"",stock:""});
            setShowEditModal(false);
        } catch (error) {
            console.error("Error While Update Product",error);
            console.error("FULL ERROR:", error.response?.data);
            alert("Error")
        }  
    } 


    //update product status
    const handleStatusChange = async (id) => {
    try {
        await axios.put(`http://localhost:4000/api/product/updateStatus/${id}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
            );
            fetchproduct();
        } catch (error) {
            console.error("Error while change Product status",error);
        }
    };

    
    //delete Product
    const handleDelete = async(id)=>{
        try {
            await axios.delete(`http://localhost:4000/api/product/delete/${id}`,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            fetchproduct();
        } catch (error) {
            console.error("Error Delete Product", error);
        }
    }

  return (
    <>
        <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Product Management</h2>
        </div>  

        <div className="admin-add-btn-wrapper">
            <button
                className="admin-add-btn"
                onClick={() =>navigate("/admin/product/create")}
            >
                + Add Product
            </button>
        </div>

        <div className='admin-blog-table-content'>
            <table className="admin-blog-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Created Date</th>
                        <th>Status</th>
                        {/* <th>Product Review</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPrduct.map((item,index) => (
                    <tr key={item.id}>
                        <td>{firstIndex+ index + 1}</td>
                        <td>
                            <img src={`http://localhost:4000/uploads/product/${item.product_image}`} 
                               style={{width:"25px"}}
                            />
                        </td>
                        <td>{item.product_name}</td>
                        
                        <td>
                            {item.discount_price  && item.discount_price < item.price ? (
                                <>
                                <span style={{ color: "green", fontWeight: "600" }}>
                                    $ {item.discount_price}
                                </span>
                                <br />
                                <span style={{ textDecoration: "line-through", color: "#888" }}>
                                    $ {item.price}
                                </span>
                                </>
                            ):(
                                <span>$ {item.price}</span>
                            )}
                        </td>

                        <td>
                            {item.stock > 0 ? (
                                <span className="admin-badge bg-success">
                                    In Stock ({item.stock})
                                </span>
                            ):(
                                <span className="admin-badge bg-danger">
                                    Out of Stock
                                </span>
                            )}
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

                        {/* <td>
                            <button onClick={() => handleOpenComments(item.id)} className='blog-review-btn'>
                                Review
                            </button>
                        </td> */}

                        <td>
                            <div className='admin-action-button'>
                                <button className='admin-view-btn'
                                    onClick={()=>handleView(item)}
                                >
                                    <MdOutlineRemoveRedEye />
                                </button>
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

            {/* Edit Modal */}
            {showEditModal && (
                <div className="admin-product-update-overlay">
                    <div className="admin-product-update-modal">

                    <h3>Edit Product</h3>

                        <form className='product-update-form' onSubmit={handleUpdate}>

                            <label htmlFor="">Product Name</label>
                            <input
                                type="text"
                                name="product_name"
                                value={editData.product_name}
                                onChange={handleEditChange}
                                placeholder="Product Name"
                            />

                            <label htmlFor="">Product Image</label>
                            <input
                                type="file"
                                name="product_image"
                                onChange={handleEditChange}
                            />


                            <label htmlFor="">Select Category</label>
                            <select
                                name="category_id"
                                value={editData.category_id}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Category</option>
                                    {productCategory.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.category_name}
                                    </option>
                                    ))}
                            </select>
                                
                            <label htmlFor="">Select Tag</label>
                            <select
                                name="tag_id"
                                value={editData.tag_id}
                                onChange={handleEditChange}
                            >
                                <option value="">Select Category</option>
                                    {productTag.map((tag) => (
                                    <option key={tag.id} value={tag.id}>
                                        {tag.tag_name}
                                    </option>
                                    ))}
                            </select>

                            <label htmlFor="">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={editData.price}
                                onChange={handleEditChange}
                                placeholder="Price"
                            />

                            <label htmlFor="">Disscount Price</label>
                            <input
                                type="number"
                                name="discount_price"
                                value={editData.discount_price}
                                onChange={handleEditChange}
                                placeholder="Discount Price"
                            />

                            <label htmlFor="">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                value={editData.stock}
                                onChange={handleEditChange}
                                placeholder="Stock"
                            />

                            <label htmlFor="">Product Description</label>
                            <textarea
                                name="product_description"
                                value={editData.product_description}
                                onChange={handleEditChange}
                                rows={8}
                                placeholder="Description"
                            />

                            <label htmlFor="">Additional Info</label>
                            <textarea
                                name="additional_information"
                                value={editData.additional_information}
                                onChange={handleEditChange}
                                rows={8}
                                placeholder="Additional Info"
                            />

                            <div className="update-model-action">
                                <button type="submit" className='admin-update-btn'>
                                    Update
                                </button>

                                <button
                                    type="button"
                                    className="admin-cancel-btn"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* view Modal */}
            {showViewModal && viewData && (
                <div className="product-view-modal-overlay">
                    <div className="product-view-modal">

                        <h3>Product Details</h3>
                      
                        <div className="view-image-wrapper">
                            <img
                                src={`http://localhost:4000/uploads/product/${viewData.product_image}`}
                                style={{width:"80px"}}
                                alt={viewData.product_name}
                            />
                        </div>

                        <div className="view-details">

                            <div className="view-row">
                                <span>Name:</span>
                                <p>{viewData.product_name}</p>
                            </div>

                            <div className="view-row">
                                <span>Product Rating:</span>
                                <p><RatingStar rating={viewData.avg_rating} /></p>
                            </div>

                            <div className="view-row">
                                <span>Category:</span>
                                <p>{viewData.category_name}</p>
                            </div>

                            <div className="view-row">
                                <span>Tag:</span>
                                <p>{viewData.tag_name}</p>
                            </div>

                            <div className="view-row">
                                <span>Price:</span>
                                <p>
                                    ${viewData.discount_price ? (
                                    <>
                                        <del>{viewData.price}</del> ${viewData.discount_price}
                                    </>
                                    ) : (
                                        viewData.price
                                    )}
                                </p>
                            </div>

                            <div className="view-row">
                            <span>Stock:</span>
                                <p className={viewData.stock > 0 ? "stock-in" : "stock-out"}>
                                    {viewData.stock > 0 ? "In Stock" : "Out of Stock"}
                                    ({viewData.stock})
                                </p>
                            </div>

                            <div className="view-row column">
                            <span>Description:</span>
                                <p dangerouslySetInnerHTML={{__html:viewData.product_description}}>
                                </p>
                            </div>

                            <div className="view-row column">
                            <span>Additional Information:</span>
                                <p dangerouslySetInnerHTML={{__html:viewData.additional_information}}>
                                </p>
                            </div>

                        </div>

                        <div className="view-modal-action">
                            <button
                                className="admin-close-btn"
                                onClick={() =>setShowViewModal(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                )}
        </div>
    </>
  )
}

export default AdminProduct
