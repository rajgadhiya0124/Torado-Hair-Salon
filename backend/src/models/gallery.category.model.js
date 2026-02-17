import db from "../config/db.js"


export const GalleryCatModel = {

    createGalleryCat : async(data)=>{
        const {category_name , createdBy} = data;
        const [rows] = await db.query("CALL sp_create_gallery_category (?,?)",
            [category_name,createdBy]
        );
        
        return rows;
    },

    getAllCategory : async()=>{
        const [result] = await db.query("CALL sp_get_all_gallery_categories()");
        
        return result[0];
    },

    updateGalleryCatStaus: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_toggle_gallery_cat_status(?,?)",
            [id,updatedBy]
        );
        return result[0];
    },

    deleteGalleryCat: async(data)=>{
        const {id , updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_gallery_category(?,?)",
            [id, updatedBy]
        );

        return rows;
    }
}