import React from 'react'
import { Swiper ,SwiperSlide} from "swiper/react"
import { Autoplay } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

const HomePartner = () => {

    const partnerImg = [
        "/image/home/partner/partner-1.png",
        "/image/home/partner/partner-2.png",
        "/image/home/partner/partner-3.png",
        "/image/home/partner/partner-4.png",
        "/image/home/partner/partner-5.png",
        "/image/home/partner/partner-1.png",
        "/image/home/partner/partner-2.png",
    ]

  return (
    <section className="home-partner-section">
        <section className="container">
            <div className='partner-head'>
                <p>OUR TRUSTED PARTNER</p>
            </div>
            <div>
                <Swiper
                    modules={[Autoplay]}
                    loop={true}
                    autoplay={{
                        delay:3000,
                        disableOnInteraction: false
                    }}
                    spaceBetween={20}
                    slidesPerView={5}
                     breakpoints={{
                        0: { slidesPerView: 1 },
                        480: {slidesPerView: 2},
                        576: { slidesPerView: 3 },
                        768: { slidesPerView: 3 },
                        992: { slidesPerView: 5 },
                    }}

                >   
                {partnerImg.map((item)=>(
                    <SwiperSlide key={item.id}>
                        <div className='partner-item'>
                            <img src={item} alt="" />
                        </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
        </section>
    </section>
  )
}

export default HomePartner
