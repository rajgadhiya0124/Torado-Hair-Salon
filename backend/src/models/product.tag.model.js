import db from "../config/db.js";


export const ProductTagModel = {
    createProductTag : async(data)=>{
        const {tag_name, tag_slug, createdBy} = data;

        const [rows] = await db.query("CALL sp_add_product_tag(?,?,?)",
            [tag_name, tag_slug, createdBy]
        );
        return rows;
    },

    getAllProductTag : async()=>{
        const [result] = await db.query("CALL sp_get_all_product_tags()");

        return result[0];
    },

    updateProductTagStatus: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_toggle_product_tag_status(?,?)",
            [id,updatedBy]
        );
        return result[0];
    },

    updateProductTag : async(data)=>{
        const {id, tag_name, tag_slug, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_product_tag(?,?,?,?)",
            [id, tag_name, tag_slug, updatedBy]
        );
        return rows;
    },

    deleteProductTag: async(data)=>{
        const {id, updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_product_tag(?,?)",
            [id, updatedBy]
        );

        return rows;
    }
}