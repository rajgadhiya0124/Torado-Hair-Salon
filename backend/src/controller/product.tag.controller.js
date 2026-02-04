import { ProductTagModel } from "../models/product.tag.model.js";


//create product tag 
export const createProductTag = async(req,res)=>{
    try {
        const data ={
            ...req.body,
            createdBy : req.user ? req.user.id : null,
        }

        await ProductTagModel.createProductTag(data);

        res.status(200).json({
            success: true,
            message: "Product Tag Created",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get All Tag 
export const getAllProductTag = async(req,res)=>{
    try {
        
        const productTag = await ProductTagModel.getAllProductTag();

        res.status(200).json({
            success: true,
            data : productTag
        });        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update product tag
export const updateProductTag = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        }

        await ProductTagModel.updateProductTag(data);

        res.status(200).json({
            success: true,
            message: "Product Tag Updated",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete product tag
export const deleteProductTag = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await ProductTagModel.deleteProductTag(data);

        res.status(200).json({
            success: true,
            message: "Product Tag Deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}