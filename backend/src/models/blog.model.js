import db from "../config/db.js";


export const BlogModel = {
    createBlog: async(data)=>{
        const {
        category_id, tag_id, author_id,
        blog_title, blog_image, blog_date, content, createdBy} = data;

        const [rows] = await db.query("CALL sp_create_blog(?,?,?,?,?,?,?,?)",
            [   category_id, tag_id, author_id,
                blog_title, blog_image, blog_date, content, createdBy]  
        )

        return rows;
    },

    getAllBlog : async()=>{
        const [result] = await db.query("CALL sp_get_all_blogs()");

        return result[0];
    },

    getblogById : async(BlogId)=>{

        const [result] = await db.query("CALL sp_get_blog_by_id(?)",
            [BlogId]
        );

        return result[0][0];
    },

    updateBlog : async(data)=>{
        const {
            BlogId,category_id, tag_id, author_id,
            blog_title, blog_image, blog_date, content, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_blog(?,?,?,?,?,?,?,?,?)",
            [BlogId ,category_id, tag_id, author_id,
            blog_title, blog_image, blog_date, content, updatedBy]
        );

        return rows;
    },

    deleteBlog: async(data)=>{
        const {BlogId ,updatedBy} = data;
        
        const [rows] = await db.query("CALL sp_delete_blog(?,?)",
            [BlogId,updatedBy]
        )
    
        return rows;
    },

    //get blog by category or category id
    getBlogBycategory: async(category_id)=>{

        const [result] = await db.query("CALL sp_get_blogs_by_category(?)",
            [category_id]
        );

        return result[0];
    },

    //get blog by tag id
    getBlogByTag : async(tag_id)=>{

        const [result] = await db.query("CALL sp_get_blogs_by_tag(?)",
            [tag_id]
        );

        return result[0];
    }
}