import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import { HiMinusSmall } from "react-icons/hi2";
import { GoPlus } from "react-icons/go";
import { useState } from 'react';
import RatingStar from '../components/RatingStar';
import { toast } from 'react-toastify';
import { useCart } from '../Context/CartContext';

const ShopDetailsPage = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [product, setProduct] = useState([]);
    const [productReview, setProductReview] = useState([]);

    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("description");
    const [reviewData, setReviewData] = useState({
        user_name: "",
        user_email: "",
        rating:"",
        review_message: ""
    });

    const token = localStorage.getItem("token");

    //fetch product
    const fetchSingleProduct = async()=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/product/getById/${id}`);
            setProduct(res.data.data);
        } catch (error) {
            console.error("Error while fetch Single product",error);
        }
    }

    useEffect(()=>{
        fetchSingleProduct();
    },[id]);
    

    //fetch reivew
    const fethReview = async()=>{
        try {
            const res = await axios.get(`http://localhost:4000/api/product/review/getAllReview/${id}`);
            setProductReview(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Product Review",error)
        }
    }

    useEffect(()=>{
        fethReview();
    },[id]);

    //review form
    const handleChange = (e) => {
        setReviewData({
            ...reviewData,
            [e.target.name]: e.target.value
        });
    };

    const submitReview = async(e)=>{
        e.preventDefault();

        try {
            await axios.post("http://localhost:4000/api/product/review/create",
                {
                    product_id: id,
                    user_name: reviewData.user_name,
                    user_email: reviewData.user_email,
                    rating: reviewData.rating,
                    review_message: reviewData.review_message
                },
                {
                    headers:{ 
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("Review submitted successfully");

            setReviewData({
                user_name: "",
                user_email: "",
                rating:"",
                review_message: ""
            });

        } catch (error) {
            console.error("error while submit review form",error);
            alert(error.response?.data?.message || "Something went wrong");
        }
    }


    const increase = () => {
        setQuantity(quantity + 1);
    };
    
    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const formateReviwDate = (dateString)=>{
        const date = new Date(dateString)

        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "long" });
        const year = date.getFullYear();

        const time = date.toLocaleString("en-us",{
            hour:"2-digit",
            minute:"2-digit",
            hour12: true
        });
        return `${day} ${month}, ${year} AT ${time}`
    }

  return (
    <>
    <section className="shopdetails-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Shop Details</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Shop Details</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/product/shopdetails-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="shopdetails-page-section">
        <section className='containers'>
            <div className="row align-items-ceter">
                <div className="col-12 col-lg-5">
                    <div className='shopdetails-product-img-content'>
                        <img src={`http://localhost:4000/uploads/product/${product.product_image}`} alt="" />
                    </div>
                </div>
                <div className="col-12 col-lg-7">
                    <div className='product-details-right'>
                        <h3 className='pd-product-title'>{product.product_name}</h3>
                        
                        <div className="product-price-box">
                            {product.discount_price && product.discount_price < product.price ? (
                                <>
                                <span className="discount-price">${product.discount_price}</span>
                                <span className="original-price">${product.price}</span>
                                </>
                            ) : (
                                <span className="normal-price">${product.price}</span>
                            )}
                        </div>

                        <div className='product-rating'>
                            <RatingStar rating={productReview.average_rating}/> 
                            <p className='m-0'>{productReview.total_review} Reviews</p>
                        </div>

                        <div className='produt-description'
                            dangerouslySetInnerHTML={{ __html: product.product_description}}> 
                        </div>

                        <div className='product-aviablity'>
                            <div>
                                <b>Availablity :</b> {product.stock === 0 ? "Out of Stock" : "In Stock"}
                            </div>

                            <div><b>Category :</b> {product.category_name} </div>
                            <div><b>Tags :</b> {product.tag_name} </div>
                        </div>

                        <div className='quantity-box'>
                            <b>Quantities:</b>

                            <div className="quantity-buttons">
                                <button onClick={decrease}>
                                    <HiMinusSmall />
                                </button>
                                {quantity}
                                <button onClick={increase}>
                                    <GoPlus />
                                </button>
                            </div>
                        </div>

                        <div className='shopdetails-buy-button'>
                            <button className='shop-cart-btn'
                                    onClick={()=> addToCart(product,quantity)}>
                                Add To Cart
                            </button>

                            <button className='shop-buy-btn'
                                onClick={()=>{
                                    addToCart(product,quantity)
                                    navigate("/cart")
                                }}
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>

    <section className='productdetails-tabs-container'>
        <section className="containers">
            <div className='productdetails-tabs'>
                <div className='tabs-header'>
                    <button
                        className={activeTab === "description" ? "active" : ""}
                        onClick={()=>setActiveTab("description")}
                    >
                        Description
                    </button>

                    <button
                        className={activeTab === "additional" ? "active" : ""}
                        onClick={()=>setActiveTab("additional")}
                    >
                        Additional Information
                    </button>

                    <button
                        className={activeTab === "reviews" ? "active" : ""}
                        onClick={()=>setActiveTab("reviews")}
                    >
                        Reviews
                    </button>
                </div>

                <div className="tabs-data-content">
                    {activeTab === "description" && (
                        <div 
                            className='tab-product-description'
                            dangerouslySetInnerHTML={{__html:product?.product_description}}>
                           
                        </div>
                    )}

                    {activeTab === "additional" && (
                        <div
                            className='tab-additioninfo'
                            dangerouslySetInnerHTML={{__html:product?.additional_information}}
                        >   
                        </div>
                    )}

                    {activeTab === "reviews" && (
                        <div>
                            <div className='product-avgraing-info'>
                                <h3>Customer Reviews</h3>
                                <p><RatingStar rating={productReview.average_rating}/></p>
                                <p>Based On {productReview.total_review} Reviews</p>
                            </div>

                            {productReview.reviews.map((item)=>(
                            <div className='customer-review-show'>
                                <div className='reivew-box'>
                                    <div className='d-flex gap-3'>
                                        <div className="review-avatar">
                                            {item.user_name?.charAt(0).toUpperCase()}
                                        </div>

                                        <div className='review-user-info'>
                                            <h4>{item.user_name}</h4>
                                            <p className='review-date'>
                                                {formateReviwDate(item.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <Link className='report-link'>Report As Inappropriate</Link>
                                    </div>
                                </div>
                                <p>{item.review_message}</p>
                            </div>
                            ))}

                            <div className='review-form-content'>
                                <h3>Write A Review</h3>
                                
                                <form className='product-review-form' onSubmit={submitReview}>
                                    <div className="review-form-row">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            name="user_name"
                                            value={reviewData.user_name}
                                            onChange={handleChange}
                                            required
                                        />

                                        <input
                                            type="email"
                                            placeholder="Your Email"
                                            name="user_email"
                                            value={reviewData.user_email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="review-form-group">
                                        <input 
                                            type="text" 
                                            placeholder='Give Rating (Between 1 To 5)'
                                            name='rating'
                                            value={reviewData.rating}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="review-form-group">
                                        <textarea
                                            name="review_message"
                                            rows="8"
                                            placeholder="Write your review here..."
                                            value={reviewData.review_message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button type='submit' className="messages-button">
                                        Send Messagee
                                    </button>
                                </form>
                            </div>
                        </div>
                        
                    )}
                </div>
            </div>
        </section>
    </section>
    </>
  )
}

export default ShopDetailsPage
