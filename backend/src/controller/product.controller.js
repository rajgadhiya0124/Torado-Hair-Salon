import { ProductModel } from "../models/product.model.js";

//create product
export const createProduct = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            product_image : req.file ? req.file.filename : null,
            createdBy : req.user ? req.user.id : null
        }

        await ProductModel.createProduct(data);

        res.status(200).json({
            success: true,
            message: "Product Created",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get All products
export const getAllProducts = async(req,res)=>{
    try {
        const product = await ProductModel.getAllProduct();

        res.status(200).json({
            success: true,
            data : product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get product by id
export const getProductById = async(req,res)=>{
    try {
        const id = req.params.id;

        const singleProduct = await ProductModel.getProductById(id);

        res.status(200).json({
            success: true,
            data : singleProduct
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update Product
export const updateProduct = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            product_image : req.file ? req.file.filename : null,
            updatedBy : req.user ? req.user.id : null
        }   

        await ProductModel.updateProduct(data);

        res.status(200).json({
            success: true,
            message: "Product Updated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete product
export const deleteProduct = async(req,res)=>{
    try {
        const data = {
            id:req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await ProductModel.deleteProduct(data);

        res.status(200).json({
            success: true,
            message: "Product Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}