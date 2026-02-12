import { BlogAuthorModel } from "../models/blog.author.model.js";

//create blog author
export const creatBlogAuthor = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            author_image : req.file ? req.file.filename : null,
            createdBy : req.user ? req.user.id : null
        }

        await BlogAuthorModel.createBlogAuthor(data);

        res.status(200).json({
            success:true,
            message:"Author created successfully"
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all Blog Author
export const getAllBlogAuthor = async(req,res)=>{
    try {

        const author = await BlogAuthorModel.getAllBlogAuthor();

        res.status(200).json({
            success:true,
            data: author
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update blog Author status
export const updateBlogAuthorStatus = async(req,res)=>{
    try {
        const data ={
            id:req.params.id,
            updatedBy: req.user? req.user.id : null,
        }

        await BlogAuthorModel.updateBlogAuthorStatus(data);

        res.status(200).json({
            success:true,
            message:"Author status updated Sucssfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//update blog author
export const updateBlogAuthor = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id:req.params.id,
            author_image : req.file ? req.file.filename : null,
            updatedBy : req.user ? req.user.id : null,
        }

        await BlogAuthorModel.updateBlogAuthor(data);

        res.status(200).json({
            success:true,
            message:"Author updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete blog author
export const deleteBlogAuthor = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        }

        await BlogAuthorModel.deleteBlogAuthor(data);

        res.status(200).json({
            success:true,
            message:"Author Deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}