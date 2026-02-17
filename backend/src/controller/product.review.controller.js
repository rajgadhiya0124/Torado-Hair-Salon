import { ProductReviewModel } from "../models/product.review.model.js";

//createe product review
export const createProductReview = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy: req.user ? req.user.id : null,
        }

        await ProductReviewModel.createProductReview(data);

        res.status(200).json({
            success: true,
            message: "Review Creaated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// get all review
export const getAllReview = async(req,res)=>{
    try {
        const review = await ProductReviewModel.getAllReview();

        res.status(200).json({
            success: true,
           data : review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//get all product review with total count and avrage raing for reach product
export const getProductAllReview = async(req,res)=>{
    try {
        const ProductId = req.params.ProductId;

        const result = await ProductReviewModel.getProductAllReview(ProductId);

        res.status(200).json({ 
            success: true,
            data: {
                reviews: result[0] || [],
                total_review: result[1]?.[0]?.total_reviews || 0,
                average_rating: result[1]?.[0]?.average_rating || 0
            }
            // review : result[0],
            // count: result[1]?.[0]
            // count: summary
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//update Product Review status
export const updateProductReviewStatus = async(req,res)=>{
    try {
        const data ={
            id:req.params.id,
            updatedBy: req.user? req.user.id : null,
        }

        await ProductReviewModel.updateProductReviewStaus(data);

        res.status(200).json({
            success:true,
            message:"Product Review Status updated Sucssfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//delete product review
export const deleteProductReview = async(req,res)=>{
    try {
        const data ={
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        }

        await ProductReviewModel.deleteProductReview(data);

        res.status(200).json({
            success: true,
            message : "Product Review Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}