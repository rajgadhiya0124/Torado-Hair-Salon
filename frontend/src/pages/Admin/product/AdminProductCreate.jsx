import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {toast} from "react-toastify"

const AdminProductCreate = () => {

    const [formData, setFormData] = useState({
        category_id: "",
        tag_id: "",
        product_name: "",
        product_image: null,
        price: "",
        discount_price: "",
        product_description: "",
        additional_information: "",
        stock: ""
    });

    const [productCategory, setProductcategory] = useState([]);
    const [productTag, setProductTag] = useState([]);

    const token = localStorage.getItem("token");

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
        fetchProductCategory();
        fetchProductTag();
    },[]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "product_image") {
            setFormData({ ...formData, product_image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

        const data = new FormData();

        data.append("category_id", formData.category_id);
            data.append("tag_id", formData.tag_id);
            data.append("product_name", formData.product_name);
            data.append("price", formData.price);
            data.append("discount_price", formData.discount_price);
            data.append("product_description", formData.product_description);
            data.append("additional_information", formData.additional_information);
            data.append("stock", formData.stock);

            if (formData.product_image instanceof File) {
                data.append("product_image", formData.product_image);
            }

        try {
            await axios.post("http://localhost:4000/api/product/create",data,
                { headers: { 
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data" 
                } }
            );

        toast.success("Product Created Successfully");
        setFormData({
            category_id: "",tag_id: "",product_name: "",product_image: null,
            price: "",discount_price: "",product_description: "",additional_information: "",stock: ""
        });

        } catch (error) {
            console.error("Error While Create Product", error);
        }
    };


  return (
    <>
        {/* <div className='admin-page-title-content'>
            <h2 className='admin-page-title'>Create Product</h2>
        </div> */}

        <div className='product-create-form-content'>
            <h2>Create Product</h2>

            <form className="product-create-form" onSubmit={handleSubmit}>

                <label htmlFor="">Product Name</label>
                <input
                    type="text"
                    name="product_name"
                    placeholder="Product Name"
                    value={formData.product_name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="">Product Image</label>
                <input
                    type="file"
                    name="product_image"
                    onChange={handleChange}
                    required
                />

                {formData.product_image && (
                <img
                    src={URL.createObjectURL(formData.product_image)}
                    style={{
                        width:"30px",
                        borderRadius:"8px"
                    }}
                    alt="preview"
                />
                )}

                <label htmlFor="">Product Category</label>
                <select
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    required
                >
                <option value="">Select Category</option>
                {productCategory.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.category_name}
                    </option>
                ))}
                </select>

                <label htmlFor="">Product Tag</label>
                <select
                    name="tag_id"
                    value={formData.tag_id}
                    onChange={handleChange}
                >
                <option value="">Select Tag</option>
                {productTag.map((tag) => (
                    <option key={tag.id} value={tag.id}>
                        {tag.tag_name}
                    </option>
                ))}
                </select>

                <label htmlFor="">Product Price</label>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="">Discount Price</label>
                <input
                    type="number"
                    name="discount_price"
                    placeholder="Discount Price"
                    value={formData.discount_price}
                    onChange={handleChange}
                />

                <label htmlFor="">Stock</label>
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="">Product Description</label>
                <textarea
                    name="product_description"
                    placeholder="Product Description"
                    value={formData.product_description}
                    onChange={handleChange}
                    rows="8"
                />

                <label htmlFor="">Additional Information</label>
                <textarea
                    name="additional_information"
                    placeholder="Additional Information"
                    value={formData.additional_information}
                    onChange={handleChange}
                    rows="8"
                />

                <button type="submit" className="product-create-btn">
                    Create Product
                </button>

            </form>
        </div>
    </>
  )
}

export default AdminProductCreate
