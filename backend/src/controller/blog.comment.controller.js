import { BlogCommentModel } from "../models/blog.comment.model.js";


//create blog comment
export const createBlogComment = async(req,res)=>{
    try {
        const data ={
            ...req.body,
            createdBy: req.user ? req.user.id : null,
        }

        await BlogCommentModel.createBlogComment(data);

        res.status(200).json({
            success:true,
            message:"Blog Comment created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all blog comment by blog is or each blog
export const getCommentByblogId = async(req,res)=>{
    try {
        const blog_id = req.params.blog_id;

        const blog = await BlogCommentModel.getCommnetByBlog(blog_id);

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

//delet blog comment
export const deleteBlogComment = async(req,res)=>{
    try {
        const data = {
            id : req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await BlogCommentModel.deleteBlogComment(data);

        res.status(200).json({
            success:true,
            message:"Blog Comment Deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}