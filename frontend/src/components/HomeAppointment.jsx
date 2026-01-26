import React from 'react'

const HomeAppointment = () => {
  return (
    <section className="home-appointment-section">
        <section className="containers">
            <div className="row align-items-center">
                <div className="col-12 col-lg-6">
                    <div className="home-appointemnt-left">
                        <span className='appoint-sub'>For Your Services</span>
                        <h2 className='appoint-title'>Make An Appointment</h2>

                        <div className="home-appointment-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" placeholder="Your Name" />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder="Email Address" />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                <input type="tel" placeholder="Phone Number" />
                                </div>
                                <div className="form-group">
                                <select>
                                    <option value="">Select Person</option>
                                    <option>1 Person</option>
                                    <option>2 Persons</option>
                                    <option>3 Persons</option>
                                    <option>4+ Persons</option>
                                </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                <input type="date" />
                                </div>
                                <div className="form-group">
                                <input type="text" placeholder="Address" />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <textarea rows="5" placeholder="Your Message"></textarea>
                            </div>

                            <button type="submit" className="book-btn">
                                Book Now
                            </button>

                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="home-appointemnt-right">
                        <img src="/image/home/appointment/appointment.png" className='appointment-img' alt="" />
                        <img src="/image/home/appointment/appoint-sign.png" className='appoint-sign-img' alt="" />
                    </div>
                </div>
            </div>
        </section>
    </section>
  )
}

export default HomeAppointment
