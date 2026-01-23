import React from 'react'
import { Link } from 'react-router-dom'

const HomeService = () => {
  return (
    <section className="home-service-section">
        <section className="containers">
            <div className='service-head'>
                <div>
                    <span className='service-sub'>Services We Provide</span>
                    <h2 className='service-title'>We Are A Place Where You Can Enjoy And Relax</h2>
                </div>

                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit incididunt ut labore et dolore magna aliqua uis ipsum suspendisse.</p>
                </div>
            </div>

            <div className='service-main'>
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="service-card">
                            <img src="/image/home/servicess/sicon-1.png" alt="" />

                            <h3>
                                <Link className='service-name'>Hair Botox & Keratin Straightening</Link>
                            </h3>
                            <p>Mauris eu nisi eget nisi imperdiet vstibum nunc sodales vehicula risus do.</p>
                            <button className='read-more'>Read More</button>
                        </div>
                    </div> 

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="service-card">
                            <img src="/image/home/servicess/sicon-2.png" alt="" />

                            <h3>
                                <Link className='service-name'>Repair of Nails After Gel Extension</Link>
                            </h3>
                            <p>Mauris eu nisi eget nisi imperdiet vstibum nunc sodales vehicula risus do.</p>
                            <button className='read-more'>Read More</button>
                        </div>
                    </div>  
                    
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="service-card">
                            <img src="/image/home/servicess/sicon-3.png" alt="" />

                            <h3>
                                <Link className='service-name'>Recovery Hair Masks & Treatment</Link>
                            </h3>
                            <p>Mauris eu nisi eget nisi imperdiet vstibum nunc sodales vehicula risus do.</p>
                            <button className='read-more'>Read More</button>
                        </div>
                    </div>  
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeService
