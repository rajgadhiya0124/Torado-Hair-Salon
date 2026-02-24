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

    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState("");
    const [productcategory, setProductCategory] = useState([]);
    const [productTag, setProductTag] = useState([]);

    const [category, setCategory] = useState([]);  //filter state
    const [tag, setTag] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    //fetch product catgory
    const fetchCategory = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/category/getall");
            const activeCat = res.data.data.filter(
                (item)=> item.status === 1
            )
            setProductCategory(activeCat)
        } catch (error) {
            console.error("Error While Fetch category",error);
        }
    }

    //fetch product tag
    const fetchTags = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/tag/getall");
            const activetag = res.data.data.filter(
                (item)=> item.status === 1
            )
            setProductTag(activetag)
        } catch (error) {
            console.error("Error While Fetch Tag",error);
        }
    }
    useEffect(()=>{
        fetchCategory();
        fetchTags();
    },[]);


    const fetchFilterProduct = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/product/filterproduct",
                {
                    params:{
                        category: category.length ? category.join(",") : undefined,
                        tag: tag.length ? tag.join(",") : undefined,
                        priceMin: priceMin || undefined,
                        priceMax: priceMax || undefined,
                    }
                }
            );
            setProduct(res.data.data)
        } catch (error) {
            
        }
    }
    useEffect(() => {
        fetchFilterProduct();
    }, [category, tag, priceMin, priceMax]);

    // //fetch Product
    // const fetchProduct = async()=>{
    //     try {
    //         const res = await axios.get("http://localhost:4000/api/product/getAll");
    //         const Activeproduct = res.data.data.filter(
    //             (item)=> item.status === 1
    //         )
    //         setProduct(Activeproduct);
    //     } catch (error) {
    //         console.error("Error While Fetch product", error);
    //     }
    // }

    // useEffect(()=>{
    //     fetchProduct();
    // },[]);

    
    const filterProduct = product.filter((product)=>
        product.product_name.toLowerCase().includes(search.toLowerCase())    
    );

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;

    const CurrentProduct = filterProduct.slice(firstIndex,lastIndex);
    const totalPage = Math.ceil( filterProduct.length / itemsPerPage)

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
                                    {/* <button onClick={()=>addToWishlist(item)}><CiHeart /></button> */}
                                    <button onClick={()=>handleWishlist(item.id)}><CiHeart /></button>
                                    <button onClick={()=>addToCart(item,quantity)}>
                                        <AiOutlineShoppingCart />
                                    </button>
                                    <button><IoSwapVertical /></button>
                                </div>
                            </div>

                            <div className='produt-info-box'>
                                <div> <RatingStar rating={item.avg_rating}/> </div>
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

                        <ul className='price-filter-ul'>
                            <h3 className='price-filter-title'>Filter By Price</h3>
                            <li className="price-inputs">
                                <input
                                    type="number"
                                    placeholder="Min Price"
                                    value={priceMin}
                                    onChange={(e) => setPriceMin(e.target.value)}
                                    // className="w-full border p-2"
                                />

                                <input
                                    type="number"
                                    placeholder="Max Price"
                                    value={priceMax}
                                    onChange={(e) => setPriceMax(e.target.value)}
                                    // className="w-full border p-2"
                                />

                            </li>

                            <h3 className='price-filter-title'>Category</h3>
                            <li>
                                {productcategory.map((cat)=>(
                                    <div key={cat.id}>
                                    <input
                                        type="checkbox"
                                        value={cat.id}
                                        checked={category.includes(cat.id)}
                                         onChange={(e) => {
                                            const { checked } = e.target;

                                            setCategory((prev) =>
                                                checked
                                                ? [...prev, cat.id]
                                                : prev.filter((id) => id !== cat.id)
                                            );
                                        }}
                                    />
                                    <label>{cat.category_name}</label>
                                </div>
                                ))}
                            </li>
                            
                            <h3 className='price-filter-title'>Tag</h3>
                            <li>
                                {productTag.map((tags)=>(
                                    <div key={tags.id}>
                                    <input
                                        type="checkbox"
                                        value={tags.id}
                                        checked={tag.includes(tags.id)}
                                         onChange={(e) => {
                                            const { checked } = e.target;

                                            setTag((prev) =>
                                                checked
                                                ? [...prev, tags.id]
                                                : prev.filter((id) => id !== tags.id)
                                            );
                                        }}
                                    />
                                    <label>{tags.tag_name}</label>
                                </div>
                                ))}
                            </li>
                        </ul> 

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
