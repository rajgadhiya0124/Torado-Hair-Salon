import { ProductCategoryModel } from "../models/product.category.model.js";

//create product category
export const createProductCat = async(req,res)=>{
    try {
        const data = {
            ...req.body,
           createdBy : req.user ? req.user.id : null,
        }

        await ProductCategoryModel.createProductCategory(data);

        res.status(200).json({
            success:true,
            message:"Product Category created Sucssfully.."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get All Product Category
export const GetAllProductCat = async(req,res)=>{
    try { 
        const productCategory = await ProductCategoryModel.getAllProductCategory();

        res.status(200).json({
            success:true,
            data : productCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update Product Category
export const updateProductCat = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await ProductCategoryModel.updateProductCategory(data);

        res.status(200).json({
            success:true,
            message:"Product Category updated Sucssfully.."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete product categoy
export const deleteProductCat = async(req,res)=>{
    try {
        const data = {
            id:req.params.id,
            updatedBy: req.user ? req.user.id : null,
        }

        await ProductCategoryModel.deleteProductCategory(data);

        res.status(200).json({
            success:true,
            message:"Product Category deleted Sucssfully.."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}