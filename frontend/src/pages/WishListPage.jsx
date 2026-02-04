import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { IoMdTrash } from "react-icons/io";

const WishListPage = () => {

    const [wishlist, setWishlist] = useState([]);

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlist(data);
    }, []);

    const removeItem = (id) => {
        const updated = wishlist.filter(item => item.id !== id);
        setWishlist(updated);
        localStorage.setItem("wishlist", JSON.stringify(updated));
    };


  return (
    <>
    <section className="wishlist-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>WishList</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>WishList</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/product/shop-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="wishlist-page-section">
        <section className="containers">

            <div>
                <h2>My Wishlist</h2>
            </div>

            <div className='wishlist-grid'>
                {wishlist.length === 0 ? (
                    <p>Wishlist is empty</p>
                    ):(
                        wishlist.map((item)=>(
                            <div className='wishlist-card'>
                                <div className='wish-product-img'>
                                    <img src={`http://localhost:4000/uploads/product/${item.product_image}`} alt="" />
                                </div>

                                <div className='wish-product-info'>
                                    <h4>{item.product_name}</h4>
                                    <p>{item.price}</p>

                                    <button className='wish-remove-btn' onClick={() => removeItem(item.id)}>
                                        <IoMdTrash />
                                    </button>
                                </div>

                            </div>
                        ))
                    )}
                    <div>
                </div>
            </div>
        </section>
    </section>
    </>
  )
}

export default WishListPage
