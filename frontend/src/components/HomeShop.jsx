import React from 'react'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoSwapVertical } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import RatingStar from './RatingStar';
import { toast } from 'react-toastify';
import { useCart } from '../Context/CartContext';

const HomeShop = () => {

    const { addToCart } = useCart();
    const quantity = 1;
    const [product, setProduct] = useState([]);

    //fetch Product
    const fetchProduct = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/getBestselling");
            setProduct(res.data.data);
        } catch (error) {
            console.error("Error While Fetch product", error);
        }
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

     const token = localStorage.getItem("token");
    
    const handleWishlist = async(productId)=>{
        if(!token){
            alert("Please login first");
            return;
        }
        try {
            const res = await axios.post("http://localhost:4000/api/wishlist/add",
                {
                    // user_id: from auth
                    product_id : productId
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success("Item Added To Wislist")
        } catch (error) {
            console.error("Error While Add To wishlist",error);
            console.error(error.response.data.message);
            toast.info(error.response.data.message)
        }
    }

  return (
    <section className="home-shop-section">
        <section className="containers">
            <div className='home-shop-head'>
                <span className='shop-sub'>Our Shop</span>
                <h2 className='shop-title'>Best Selling Products</h2>
            </div>

            <div className='home-shop-main'>
                <div className="row">
                    {product.map((item)=>(
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className='home-product-card'>
                            <div className='product-img-div'>
                                <img src={`http://localhost:4000/uploads/product/${item.product_image}`} alt="" />
                                <div className='home-product-icon'>
                                    <button onClick={()=>handleWishlist(item.id)}><CiHeart /></button>
                                    <button onClick={()=>addToCart(item,quantity)}><AiOutlineShoppingCart /></button>
                                    <button><IoSwapVertical /></button>
                                </div>
                            </div>
                            <div className='home-productinfo-box'>
                                <RatingStar rating={item.avg_rating}/>
                                <h3>
                                    <Link className='home-product-name'>
                                        {item.product_name}
                                    </Link>
                                </h3>
                                {/* <span className='hproduct-price'>$340.00</span> */}
                                <div className="homeproduct-price-box">
                                    {item.discount_price && item.discount_price < item.price ? (
                                        <>
                                        <span className="discount-price">${item.discount_price}</span>
                                        <span className="original-price">${item.price}</span>
                                        </>
                                    ) : (
                                        <span className="normal-price">${item.price}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}

                    {/* <div className="col-12 col-sm-6 col-lg-3">
                        <div className='home-product-card'>
                            <div className='product-img-div'>
                                <img src="/image/home/shop/shop-2.png" alt="" />
                                <div className='home-product-icon'>
                                    <button><CiHeart /></button>
                                    <button><AiOutlineShoppingCart /></button>
                                    <button><IoSwapVertical /></button>
                                </div>
                            </div>
                            <div className='home-productinfo-box'>
                                Rating Star
                                <h3>
                                    <Link className='home-product-name'>
                                        Conserve Shampoo
                                    </Link>
                                </h3>
                                <span className='hproduct-price'>$175.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className='home-product-card'>
                            <div className='product-img-div'>
                                <img src="/image/home/shop/shop-3.png" alt="" />
                                <div className='home-product-icon'>
                                    <button><CiHeart /></button>
                                    <button><AiOutlineShoppingCart /></button>
                                    <button><IoSwapVertical /></button>
                                </div>
                            </div>
                            <div className='home-productinfo-box'>
                                Rating Star
                                <h3> 
                                    <Link className='home-product-name'>
                                        Deep Moisture Set
                                    </Link>
                                </h3>
                                <span className='hproduct-price'>$681.00</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className='home-product-card'>
                            <div className='product-img-div'>
                                <img src="/image/home/shop/shop-1.png" alt="" />
                                <div className='home-product-icon'>
                                    <button><CiHeart /></button>
                                    <button><AiOutlineShoppingCart /></button>
                                    <button><IoSwapVertical /></button>
                                </div>
                            </div>
                            <div className='home-productinfo-box'>
                                Rating Star
                                <h3>
                                    <Link className='home-product-name'>
                                        Hair Conditioner
                                    </Link>
                                </h3>
                                <span className='hproduct-price'>$723.00</span>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeShop
