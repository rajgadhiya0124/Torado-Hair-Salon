import db from "../config/db.js";


export const BlogAuthorModel = {
    createBlogAuthor: async(data)=>{
        const {author_name,author_image,author_bio,createdBy} = data;

        const [rows]= await db.query("CALL sp_create_blog_author(?,?,?,?)",
            [author_name,author_image,author_bio,createdBy]
        );

        return rows;
    },

    getAllBlogAuthor: async()=>{
        const [result] = await db.query("CALL sp_get_all_blog_authors()");

        return result[0];
    },

    updateBlogAuthorStatus : async(data)=>{
        const {id,updatedBy} = data;

        const [rows] = await db.query("CALL sp_toggle_blog_author_status(?,?)",
            [id,updatedBy]
        );
        return rows;
    },


    updateBlogAuthor: async(data)=>{
        const {id,author_name,author_image,author_bio,updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_blog_author(?,?,?,?,?)",
            [id,author_name,author_image,author_bio,updatedBy]
        );

        return rows;
    },

    deleteBlogAuthor:async(data)=>{
        const {id , updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_blog_author(?,?)",
            [id,updatedBy]
        );

        return rows;
    }

}