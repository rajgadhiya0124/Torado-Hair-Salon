import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/CartContext'
import { BiSolidTrashAlt } from "react-icons/bi";
import { FiMinus } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";

const CartPage = () => {

    const {cartItems, incrementQuantity,decrementQuantity,removeFromCart,cartTotal} = useCart();

  return (
    <>
    <section className="cart-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Shopping Cart</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Shopping Cart</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/cart/cart-banner.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>
    

    <section className="cart-page-section">
        <section className="containers">
            <div className="shop-cart-content">
                <table className="shop-table">
                    <thead>
                        <tr>
                        <th>Product</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cartItems.map((item, index) => (
                        <tr key={index}>
                            {/* Product */}
                            <td className="product-cell">
                                <img src={`http://localhost:4000/uploads/product/${item.image}`} 
                                    className='cart-product-img'
                                    alt={item.name} />
                            </td>

                            <td>
                                {item.name}
                            </td>

                            {/* Price */}
                            <td>
                                ${item.price}
                            </td>

                            {/* Quantity */}
                            <td>
                                <div className="cart-qty-btn">
                                    <button onClick={()=>decrementQuantity(item.id)}>
                                        <FiMinus />
                                    </button>

                                    <span>{item.quantity}</span>
                                    
                                    <button onClick={()=>incrementQuantity(item.id)}>
                                        <FiPlus />
                                    </button>
                                </div>
                            </td>

                            {/* Total */}
                            <td>
                                ${item.price * item.quantity}
                            </td>

                            {/* Remove */}
                            <td>
                                <button 
                                    onClick={()=>removeFromCart(item.id)} 
                                    className="cart-remove-btn">
                                        <BiSolidTrashAlt />
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
                <div className='coupn-box'>
                    <input 
                        type="text" 
                        placeholder='Coupan Code'
                        className='coupan-input'
                        
                    />
                    <button className='coupan-btn'>
                        Applay Coupan
                    </button>
                </div>

            </div>

            <div className='summary-box'>
                <div className="checkout-box">

                    <h3 className='checkout-title'>Checkout Summary</h3>
                    
                    <div>
                        <div className='checkout-details'>
                            <p>Subtotal</p>
                            <p>${cartTotal}</p>
                        </div>
                        <div className='checkout-details'>
                            <p>Shipping</p>
                            <p>$00.00</p>
                        </div>
                        <div className='checkout-details'>
                            <p>Total</p>
                            <p>${cartTotal}</p>
                        </div>

                        <div className='total-pay'>
                            <h5>Payble Total</h5>
                            <h5>${cartTotal}</h5>
                        </div>

                        <button className='checkout-btn'>Proceed To CheckOut</button>
                    </div>
                </div>
            </div>
        </section>
    </section>
    </>
  )
}

export default CartPage
