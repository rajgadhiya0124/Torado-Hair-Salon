import React from 'react'

const HomeOffer = () => {
  return (
    <section className="home-offer-section">
        <section className="containers">
            <div className='offer-top'>
                <div className='offer-head'>
                    <span className='offer-sub'>What We Offer</span>
                    <h2 className='offer-title'>Always Make Room For Beauty In Your Life</h2>
                </div>
            </div>


            <div className="offer-main-section">
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className='offer-card'>
                            <img src="/image/home/offer/offer-1.png"  className='offer-image' alt="" />
                            <div className='sign-div'>
                                <img src="/image/home/offer/sign-1.png" className='sign-img' alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className='offer-card'>
                            <img src="/image/home/offer/offer-2.png" className='offer-image' alt="" />
                            <div className='sign-div'>
                                <img src="/image/home/offer/sign-2.png" className="sign-img" alt="" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className='offer-card'>
                            <img src="/image/home/offer/offer-3.png" className='offer-image' alt="" />
                            <div className='sign-div'>
                                <img src="/image/home/offer/sign-3.png" className='sign-img' alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeOffer
