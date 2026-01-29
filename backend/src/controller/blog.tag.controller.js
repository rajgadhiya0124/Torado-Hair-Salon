import { BlogTagModel } from "../models/blog.tag.model.js";

//create blog tag
export const cretaeBlogTag = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy: req.user ? req.user.id : null
        }

        await BlogTagModel.createBlogTag(data);

        res.status(200).json({
            success:true,
            message:"Blog Tag created successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all blog tag
export const getAllBlogTag = async(req,res)=>{
    try {
        const blogtag = await BlogTagModel.getAllBlogTag();

        res.status(200).json({
            success:true,
            data: blogtag
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update blog
export const updateBlogTag = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        }

        await BlogTagModel.updateBlogTag(data);

        res.status(200).json({
            success:true,
            message:"Blog Tag updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete blog tag
export const deleteBlogTag = async(req,res)=>{
    try {
        const data = {
            id:req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await BlogTagModel.deleteBlogTag(data);

        res.status(200).json({
            success:true,
            message:"Blog Tag deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}