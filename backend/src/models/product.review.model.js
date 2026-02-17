import db from "../config/db.js"

export const ProductReviewModel = {
    
    createProductReview : async(data)=>{
        const {product_id, user_name, user_email, rating, review_message, createdBy} = data;
        const [rows] = await db.query("CALL sp_create_product_review(?,?,?,?,?,?)",
            [product_id, user_name, user_email, rating, review_message, createdBy]
        )

        return rows;
    },

    getAllReview: async()=>{
        const [result] = await db.query("CALL sp_getall_product_review()");
        return result[0];
    },

    //get all product review with total count and avrage raing for reach product
    getProductAllReview: async(productId)=>{

        const [result] = await db.query("CALL sp_get_product_reviews_with_summary(?)",
            [productId]
        )

        return  result;
    },

    updateProductReviewStaus: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_toggle_product_review_status(?,?)",
            [id,updatedBy]
        );
        return result[0];
    },
    
    deleteProductReview : async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_delete_product_review(?,?)",
            [id,updatedBy]
        );

        return result
    }
}