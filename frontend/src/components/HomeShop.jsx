import React from 'react'
import { Link } from 'react-router-dom'

const HomeShop = () => {
  return (
    <section className="home-shop-section">
        <section className="containers">
            <div className='home-shop-head'>
                <span className='shop-sub'>Our Shop</span>
                <h2 className='shop-title'>Best Selling Products</h2>
            </div>

            <div className='home-shop-main'>
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className='home-product-card'>
                            <div className='product-img-div'>
                                <img src="/image/home/shop/shop-1.png" alt="" />
                            </div>
                            <div className='home-productinfo-box'>
                                Rating Star
                                <h3>
                                    <Link className='home-product-name'>
                                        Color Conditioner
                                    </Link>
                                </h3>
                                <span className='hproduct-price'>$340.00</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className='home-product-card'>
                            <div className='product-img-div'>
                                <img src="/image/home/shop/shop-2.png" alt="" />
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
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeShop
