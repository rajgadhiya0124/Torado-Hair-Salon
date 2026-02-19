import axios from 'axios';
import React, { useEffect, useState } from 'react'

const HomePrice = () => {

    const [bestpriceService, setbestPriceService] = useState([]);

    //fetch best price services
    const fetchBestPriceService = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/home/bestpriceService/get");
            setbestPriceService(res.data.data);
        } catch (error) {
            console.error("Error While Fetch brest price service",error);
        }
    }

    useEffect(()=>{
        fetchBestPriceService();
    },[]);

    const getFirstParagraph = (html) => {
    if (!html) return "";

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const firstP = doc.querySelector("p");

        return firstP ? firstP.textContent : "";
    };

  return (
   <section className="home-price-section">
        <section className="containers">
            <div className="home-price-head">
                <span className='price-sub'>Our Prices</span>
                <h3 className='price-title'>Our Best Price Packages</h3>
            </div>

            <div className="price-main-section">
                <div className="home-price-grid">
                {bestpriceService.map((item)=>(
                    <div className="price-item-card">
                        <div>
                            <img src={`http://localhost:4000/uploads/salon-service/${item.service_image}`} 
                            className='price-item-img' alt="" />
                        </div>
                        <div>
                            <div className='item-name-price'>
                                <h3 className='item-name'>{item.service_name} </h3>
                                <span className='item-price'>${item.price}</span>
                            </div>
                            <p>
                                {getFirstParagraph(item.service_description).substring(0,50)}
                            </p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
   </section>
  )
}

export default HomePrice
