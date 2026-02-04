import React from 'react'
import { Link } from 'react-router-dom'
import { HiMinusSmall } from "react-icons/hi2";
import { HiMinus } from "react-icons/hi";
import { GoPlus } from "react-icons/go";
import { useState } from 'react';

const ShopDetailsPage = () => {

    const [quantity, setQuantity] = useState(1);

    const increase = () => {
        setQuantity(quantity + 1);
    };
    
    const decrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

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
                <div className="col-5">
                    <div className='shopdetails-product-img-content'>
                        <img src="/image/product/product-1.png" alt="" />
                    </div>
                </div>
                <div className="col-7">
                    <div className='product-details-right'>
                        <h3 className='pd-product-title'>Color Conditioner</h3>
                        
                        <div className='product-price-box'>
                            <span className='dissount-price'>$100</span>
                            <span className='orignal-price'>$200</span>
                        </div>

                        <p>Voluptatem accusantium doloremque laudantium totam rem aperiam eaque ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam tatem quia voluptas sit aspernatur aut odit aut.</p>

                        <div>
                            <p><b>Availablity:</b> In Stock</p>
                            <p><b>Category:</b> Hair Color</p>
                            <p><b>Tags:</b> Conditioner</p>
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

                        <button className='shop-cart-btn'>Add To Cart</button>
                    </div>
                </div>
            </div>
        </section>
    </section>
    </>
  )
}

export default ShopDetailsPage
