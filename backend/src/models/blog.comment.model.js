import db from "../config/db.js";


export const BlogCommentModel = {
    createBlogComment: async(data)=>{
        const { blog_id,name,email,comment,createdBy } = data;

        const [rows] = await db.query("CALL sp_create_blog_comment(?,?,?,?,?)",
            [blog_id,name,email,comment,createdBy]
        );

        return rows;
    },

    //get all comments by blog id or each blog
    getCommnetByBlog : async(blog_id)=>{

        const [result] = await db.query("CALL sp_get_comments_by_blog(?)",
            [blog_id]
        ) 

        return result[0]
    },
    
    deleteBlogComment: async(data)=>{
        const {id ,updatedBy} = data;

        const [result] = await db.query("CALL sp_delete_blog_comment(?,?)",
            [id, updatedBy]
        );

        return result;
    }
}