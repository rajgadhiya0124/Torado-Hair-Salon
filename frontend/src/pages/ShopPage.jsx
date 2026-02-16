import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { IoSwapVertical } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';
import { Range } from "react-range"
import { HiMinusSmall } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom'
import HomePartner from '../components/HomePartner';
import { toast } from 'react-toastify';
import RatingStar from '../components/RatingStar';
import { useCart } from '../Context/CartContext';

const ShopPage = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const quantity = 1;

    const MIN = 0;
    const MAX = 10000;
    const [values, setValues] = useState([2000, 8000]);

    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    //fetch Product
    const fetchProduct = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/getAll");
            const Activeproduct = res.data.data.filter(
                (item)=> item.status === 1
            )
            setProduct(Activeproduct);
        } catch (error) {
            console.error("Error While Fetch product", error);
        }
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

    
    const filterProduct = product.filter((product)=>
        product.product_name.toLowerCase().includes(search.toLowerCase())    
    );

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const CurrentProduct = filterProduct.slice(firstIndex,lastIndex);
    const totalPage = Math.ceil( product.length / itemsPerPage)

    const addToWishlist = (item)=>{
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        const exists = wishlist.find(w => w.id === item.id);

        if (exists) {
            toast.info("Already added to wishlist");
            return;
        }

        if(!exists){
            wishlist.push(item);
            localStorage.setItem("wishlist",JSON.stringify(wishlist));
        }

        navigate("/wishlist")
    }
    

  return (
    <>
    <section className="shop-hero-section">
        <section className="containers">
            <div className='row align-items-center'>
                
                <div className="col-12 col-lg-6">
                    <div className='page-hero-left'>
                        <h2>Shop</h2>
                        <div className='home-navigation'>
                            <Link to={'/'} className='home-link'>Home</Link>  /   
                            <span className='pages-title'>Shop</span>
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

    <section className="shop-page-section">
        <section className="containers">
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className="product-grid">
                        {CurrentProduct.map((item, index)=>(
                        <div className="product-card" key={index}>
                            <div className='p-image-div'>
                                <img src={`http://localhost:4000/uploads/product/${item.product_image}`} 
                                    className="product-img" alt="" />

                                <div className='products-icon'>
                                    <button onClick={()=>addToWishlist(item)}><CiHeart /></button>
                                    <button onClick={()=>addToCart(item,quantity)}>
                                        <AiOutlineShoppingCart />
                                    </button>
                                    <button><IoSwapVertical /></button>
                                </div>
                            </div>

                            <div className='produt-info-box'>
                                <p> <RatingStar rating={item.avg_rating}/> </p>
                                <h3 className='product-name' onClick={()=>navigate(`/shopdetails/${item.id}`)}>
                                    {item.product_name}
                                </h3>
                                <span className='product-price'>${item.price}</span>
                            </div>
                        </div>
                        ))}
                    </div>

                    <div className='pagination'>
                        <button
                            className='pagination-left-btn'
                            disabled = {currentPage === 1}
                            onClick={()=> setCurrentPage(currentPage - 1)}
                        >
                            <MdOutlineKeyboardArrowLeft />
                        </button>
    
                        {[...Array(totalPage)].map((_,index)=>(
                            <button
                                key={index}
                                className={`pagination-btn ${currentPage === index + 1 ? "active" : "" }`}
                                onClick={()=>setCurrentPage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
    
                        <button
                        className='pagination-right-btn'
                            disabled = {currentPage === totalPage}
                            onClick={()=>setCurrentPage(currentPage + 1)}
                        >
                            <MdOutlineKeyboardArrowRight />
                        </button>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className='product-search-div'>
                        <input 
                            type="text" 
                            placeholder='search'
                            className='product-search-input'
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}
                        />
                        <div className='product-search'>
                            <RiSearchLine  />
                        </div>
                    </div>
                    
                    <div className='price-filter-div'>
                        <h3 className='price-filter-title'>Filter By Price</h3>

                        <ul className='price-filter-ul'>
                            {/* <li className='price-inputs'>
                                ₹{values[0]} – ₹{values[1]}
                            </li>  */}

                            <li className="price-inputs">
                                <input
                                    type="number"
                                    value={values[0]}
                                    onChange={(e) =>
                                        setValues([Number(e.target.value), values[1]])
                                    }
                                />
                                <span><HiMinusSmall /></span>
                                <input
                                    type="number"
                                    value={values[1]}
                                    onChange={(e) =>
                                        setValues([values[0], Number(e.target.value)])
                                    }
                            />
                            </li>
                            {/* <li>
                                <Range
                                    step={100}
                                    min={MIN}
                                    max={MAX}
                                    values={values}
                                    onChange={setValues}
                                    renderTrack={({ props, children }) => (
                                        <div
                                        {...props}
                                        style={{
                                            height: "6px",
                                            width: "100%",
                                            background: "#ddd",
                                            borderRadius: "4px",
                                        }}
                                        >
                                        {children}
                                        </div>
                                    )}
                                    renderThumb={({ props }) => (
                                        <div
                                        {...props}
                                        style={{
                                            height: "16px",
                                            width: "16px",
                                            background: "#000",
                                            borderRadius: "50%",
                                        }}
                                        />
                                    )}
                                />
                            </li> */}
                        </ul> 

                        <button className='filter-btn'>
                            Filter
                        </button>  
                    </div>
                </div>
            </div>
        </section>
    </section>

    <HomePartner />
    </>
  )
}

export default ShopPage
