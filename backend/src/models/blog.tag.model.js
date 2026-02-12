import db from "../config/db.js";

export const BlogTagModel = {
    createBlogTag: async(data)=>{
        const {tag_name,tag_slug,createdBy} = data;

        const [rows] = await db.query("CALL sp_create_blog_tag(?,?,?)",
            [tag_name,tag_slug,createdBy]
        );

        return [rows];
    },

    getAllBlogTag: async()=>{
        const [result] = await db.query("CALL sp_get_all_blog_tags()");

        return result[0];
    },

    updateBlogTagStatus: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_toggle_blog_tag_status(?,?)",
            [id,updatedBy]
        );
        return result[0];
    },

    updateBlogTag: async(data)=>{
        const {id, tag_name, tag_slug, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_blog_tag(?,?,?,?)",
            [id,tag_name,tag_slug,updatedBy]
        )
        return rows;
    },

    deleteBlogTag : async(data)=>{
        const { id,updatedBy } = data;

        const [rows] = await db.query("CALL sp_delete_blog_tag(?,?)",
            [id,updatedBy]
        );

        return rows;
    }
}