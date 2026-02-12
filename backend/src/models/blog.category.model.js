import db from "../config/db.js";


export const BlogCategoryModel = {
    creatBlogCategory:async(data)=>{
        const {category_name ,category_slug,createdBy} = data;

        const [rows] = await db.query("CALL sp_create_blog_category(?,?,?)",
            [category_name,category_slug,createdBy]
        );
        return rows; 
    },

    getAllBlogCategory: async()=>{

        const [result] = await db.query("CALL sp_get_all_blog_category()");

        return result[0];
    },

    updateBlgCategoryStatus: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_toggle_blog_category_status(?,?)",
            [id, updatedBy]
        );
        return result;
    },

    updateBlogCategory: async(data)=>{
        const {id,category_name,category_slug,updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_blog_category(?,?,?,?)",
            [id,category_name,category_slug,updatedBy]
        );

        return rows;
    },

    deleteBlogCategory: async(data)=>{
        const {id,updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_blog_category(?,?)",
            [id,updatedBy]
        );
        return rows;
    }
}