import React from 'react'
import { FaRegStar, FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const RatingStar = ({rating}) => {
  return (
    <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => {
            if (rating >= star) return <FaStar key={star} style={{color:"#FFC107"}} />;

            if (rating >= star - 0.5) return <FaStarHalfAlt key={star} style={{color:"#FFC107"}}/>;

            return <FaRegStar key={star} style={{color:"#555"}}/>;
        })}
    </div>
  )
}

export default RatingStar
