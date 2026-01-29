import { BlogModel } from "../models/blog.model.js";


//create blog
export const CreateBlog = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            blog_image : req.file ? req.file.filename : null,
            createdBy : req.user ? req.user.id : null,
        }

        const blog = await BlogModel.createBlog(data);

        res.status(200).json({
            success:true,
            message:"Blog Created successfully",
            blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//get all blog
export const getAllBlog = async(req,res)=>{
    try {
        const blog = await BlogModel.getAllBlog();

        res.status(200).json({
            success:true,
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get blog by id or single blog
export const getBlogById = async(req,res)=>{
    try {
        const BlogId = req.params.BlogId;

        const blog = await BlogModel.getblogById(BlogId);

        res.status(200).json({
            success:true,
            data: blog
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
} 

//update blog
export const updateBlog = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            BlogId: req.params.BlogId,
            blog_image : req.file ? req.file.filename : null,
            updatedBy : req.user ? req.user.id : null,
        }

        await BlogModel.updateBlog(data);

        res.status(200).json({
            success:true,
            message:"Blog Update successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete blog
export const deleteBlog = async(req,res)=>{
    try {
        const data = {
            BlogId : req.params.BlogId,
            updatedBy: req.user ? req.user.id : null,
        }

        await BlogModel.deleteBlog(data);

        res.status(200).json({
            success:true,
            message:"Blog Deleted successfully",
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}