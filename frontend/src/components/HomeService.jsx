import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomeService = () => {
    const navigate = useNavigate();
    const [service,setService] = useState([]);

    const fetchService = async()=>{
        try {
            const res = await axios.get("http://localhost:4000/api/service/getAll");
            setService(res.data.data);
        } catch (error) {
            console.error("Error While Fetch Service",error);
        }
    }   

    useEffect(()=>{
        fetchService();
    },[]);

    const getFirstParagraph = (html) => {
    if (!html) return "";

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const firstP = doc.querySelector("p");

        return firstP ? firstP.textContent : "";
    };

 
  return (
    <section className="home-service-section">
        <section className="containers">
            <div className='service-head'>
                <div>
                    <span className='home-service-sub'>Services We Provide</span>
                    <h2 className='home-service-title'>We Are A Place Where You Can Enjoy And Relax</h2>
                </div>

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit incididunt ut labore et dolore magna aliqua uis ipsum suspendisse.</p>
                </div>
            </div>

            <div className='service-main'>
                <div className="row">
                    {service.slice(0,3).map((item)=>(
                    <div className="col-12 col-sm-6 col-lg-4" key={item.id}>
                        <div className="home-service-card">
                            <img src={`http://localhost:4000/uploads/salon-service/${item.service_icon}`} 
                            alt="" />

                            <h3>
                                <Link to={`/service-details/${item.id}`} className='service-name'>{item.service_name}</Link>
                            </h3>

                            <p>{getFirstParagraph(item.service_description.substring(0,120))}...</p>
                            
                            <button className='read-more'
                                onClick={()=>navigate(`/service-details/${item.id}`)}    
                            >
                                Read More
                            </button>
                        </div>
                    </div> 
                    ))}

                    {/* <div className="col-12 col-sm-6 col-lg-4">
                        <div className="home-service-card">
                            <img src="/image/home/servicess/sicon-2.png" alt="" />

                            <h3>
                                <Link className='service-name'>Repair of Nails After Gel Extension</Link>
                            </h3>
                            <p>Mauris eu nisi eget nisi imperdiet vstibum nunc sodales vehicula risus do.</p>
                            <button className='read-more'>Read More</button>
                        </div>
                    </div>  
                    
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="home-service-card">
                            <img src="/image/home/servicess/sicon-3.png" alt="" />

                            <h3>
                                <Link className='service-name'>Recovery Hair Masks & Treatment</Link>
                            </h3>
                            <p>Mauris eu nisi eget nisi imperdiet vstibum nunc sodales vehicula risus do.</p>
                            <button className='read-more'>Read More</button>
                        </div>
                    </div>   */}
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeService
