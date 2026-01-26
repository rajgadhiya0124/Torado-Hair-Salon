import React from 'react'

const HomeNewsletter = () => {
  return (
    <section className="home-newsletter-section">
        <section className="containers">
            <div className="newsletter-head">
                <span className='newsletter-sub'>Newsletter</span>
                <h2 className='newsletter-title'>Let Your Hair Shine With Special Offers And Deals Subscribe</h2>
            </div>

            <div className="newsletter-main-section">
                <input 
                    type="text" 
                    placeholder='Your email here...'
                    className='email-input'
                />
                <button className='subscribe-btn'>
                    Subscribe Now
                </button>
            </div>
    
        </section>
    </section>
  )
}

export default HomeNewsletter
