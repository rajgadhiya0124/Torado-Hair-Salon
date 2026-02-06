import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../Context/CartContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const CheckoutPage = () => {
    const navigate = useNavigate();

    const { cartItems, cartTotal ,clearCart} = useCart();
    const [acceptTerms, setAcceptTerms] = useState(false);


    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        company_name:"",
        country: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        order_notes: "",
        payment_method: ""
    });
    const [paymentMethod, setPaymentMethod] = useState("");


    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
    }

    const token = localStorage.getItem("token")
    const user = JSON.parse(localStorage.getItem("user"));

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptTerms) {
        toast.error("Please accept Terms & Conditions");
        return;
    }

    if (!paymentMethod) {
        toast.error("Please select a payment method");
        return;
    }

    const orderData = {
            ...formData,
            user_id: user?.id,
            order_items: cartItems.map(item => ({
                product_id: item.id,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            total_amount: cartTotal,
            payment_method: paymentMethod
        };

        try {
            const res = await axios.post("http://localhost:4000/api/order/create",orderData,
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setFormData({
                first_name: "",last_name: "",email: "",phone: "",company_name:"",
                country: "", address: "", city: "", state: "", zip: "", order_notes: "",payment_method: ""
            })
            clearCart();
            toast.success("Order placed successfully");

        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Order failed");
        }
    };

  return (
    <>
    <section className="chekout-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Checkout</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Checkout</span>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6">
                    <div className='page-hero-right'>
                        <img src="/image/chekout/checkout-baneer.png" className='hero-page-img' alt="" /> 
                    </div>
                </div>
            </div>
            <img src="/image/contactus/hero-shape1.png" className='hero-shap1' alt="" />
            <img src="/image/contactus/hero-shape2.png" className="hero-shap2" alt="" />
        </section>
    </section>

    <section className="chekout-page-section">
        <section className="containers">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div>
                        <div className='login-navigate'>
                            <input type="checkbox" onClick={()=>navigate('/login')} />
                            <label htmlFor="">Returning Customer? Click Here to login</label>
                        </div>
                        <div className='login-navigate'>
                            <input type="checkbox"onClick={()=>navigate('/cart')} />
                            <label htmlFor="">Have a Coupon? Click Here to Enter Your Code</label>
                        </div>
                    </div>

                    <div className='billing-form-content'>
                        <h3 className='bill-title'>Billing Details</h3>

                        <form className='billing-form' onSubmit={handleSubmit}>
                            <div className="chekout-form-row">
                                <input
                                    name="first_name"
                                    placeholder="First Name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="chekout-form-row">
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <input
                                name="company_name"
                                placeholder="Company Name"
                                value={formData.company_name}
                                onChange={handleChange}
                                required
                            />

                            <select
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
                            >
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="UK">UK</option>
                                <option value="Turkey">Turkey</option>
                            </select>

                            <input
                                name="address"
                                placeholder="Street Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />

                            <div className="chekout-form-row">
                                <input
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    name="state"
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                />

                                <input
                                    name="zip"
                                    placeholder="ZIP Code"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <textarea
                                name="order_notes"
                                placeholder="Order notes (optional)"
                                value={formData.order_notes}
                                onChange={handleChange}
                                rows="8"
                            />

                            <button type="submit" className='place-order-btn'>Place Order</button>
                        </form>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className='chekout-right'>
                        <div className='checkout-summary'>
                            <h3 className='order-s-titie'>Order Summary</h3>

                            {cartItems.map((item)=>(
                            <div className='product-smmery-div'>
                                <div className='product-info-div'>
                                    <div className='product-img-qty'>
                                        <img src={`http://localhost:4000/uploads/product/${item.image}`} 
                                            className='s-product-img' alt="" 
                                        />
                                        <div className='q-box'>
                                            Qty: {item.quantity}
                                        </div>
                                    </div>

                                    <div className='product-name-price'>
                                        <h4 className='product-item-name'>{item.name}</h4>
                                        <p className='product-item-price'>Price : {item.price}</p>
                                    </div>
                                </div>

                                <div className='s-product-price'>
                                    ${item.quantity * item.price}
                                </div>
                            </div>
                            ))}

                            <div className='total-price'>
                                <h5 style={{fontSize:"18px"}}>Payable Ammount:</h5>
                                <b>${cartTotal}</b>
                            </div>
                        </div>

                        <div className='payment-method-box'>
                            <h3 className='payment-title'>Payment Method</h3>

                            <div className='payment-option-content'>
                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value={"bank_transfer"}
                                        checked={paymentMethod === "bank_transfer"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />{" "}
                                    Direct Bank Transfer

                                    <p>Make your payment directly into our bank account Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have our account.</p>
                                </label>

                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value={"cod"}
                                        checked={paymentMethod === "cod"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />{' '}
                                    Cash on Delivery
                                </label>

                                <label className="payment-option">
                                    <input
                                        type="radio"
                                        name="payment_method"
                                        value={"paypal"}
                                        checked={paymentMethod === "paypal"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />{' '}
                                    PayPal
                                </label>

                                <label>
                                    <input
                                        type="checkbox"
                                        checked={acceptTerms}
                                        onChange={(e) => setAcceptTerms(e.target.checked)}
                                    />{" "}
                                    I’ve read and accept the
                                    <a href="/terms" target="_blank">Terms & Conditions</a>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
    </>
  )
}

export default CheckoutPage
