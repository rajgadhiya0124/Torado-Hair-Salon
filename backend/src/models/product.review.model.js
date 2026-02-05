import db from "../config/db.js"

export const ProductReviewModel = {
    
    createProductReview : async(data)=>{
        const {product_id, user_name, user_email, rating, review_message, createdBy} = data;
        const [rows] = await db.query("CALL sp_create_product_review(?,?,?,?,?,?)",
            [product_id, user_name, user_email, rating, review_message, createdBy]
        )

        return rows;
    },

    //get all product review with total count and avrage raing for reach product
    getProductAllReview: async(productId)=>{

        const [result] = await db.query("CALL sp_get_product_reviews_with_summary(?)",
            [productId]
        )

        return  result;
    } 
}