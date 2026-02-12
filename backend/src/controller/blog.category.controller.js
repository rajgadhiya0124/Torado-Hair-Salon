import { BlogCategoryModel } from "../models/blog.category.model.js";


//create blog category
export const createBlogCategory = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy : req.user ? req.user.id : null,
        }

        await BlogCategoryModel.creatBlogCategory(data);

        res.status(200).json({
            success:true,
            message:"Blog Category created successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all blog category
export const getAllBlogCategory = async(req,res)=>{
    try {
        
        const blogcategory = await BlogCategoryModel.getAllBlogCategory();

        res.status(200).json({
            success:true,
            data: blogcategory
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update blog category status
export const updateBlogCategoryStatus = async (req, res) => {
  try {

    const data = {
        id: req.params.id,
        updatedBy: req.user ? req.user.id : null
    }

    await BlogCategoryModel.updateBlgCategoryStatus(data);

    res.json({
      success: true,
      message: "Category status updated successfully",
    });
  } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
  }
};

//update blog category
export const updateBlogCategory = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null, 
        }
        
        await BlogCategoryModel.updateBlogCategory(data);

        res.status(200).json({
            success:true,
            message:"Blog Category Updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete blog category
export const deleteBlogCategory = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy: req.user ? req.user.id : null,
        }

        await BlogCategoryModel.deleteBlogCategory(data);

        res.status(200).json({
            success:true,
            message:"Blog Category Deleted successfully"
        });        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}