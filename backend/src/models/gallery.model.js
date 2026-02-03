import db from "../config/db.js";

export const GalleryModel = {

    createGallery: async(data)=>{
        const { category_id, serivce_name, service_image, createdBy} = data;

        const [rows] = await db.query("CALL sp_create_gallery(?,?,?,?)",
            [category_id, serivce_name, service_image, createdBy]
        );

        return rows;
    },

    getAllGallery : async()=>{
        
        const [result] = await db.query("CALL sp_get_all_gallery()");

        return result[0];
    },

    getGalleryById : async(id)=>{
        const [result] = await db.query("CALL sp_get_gallery_by_id(?)",
            [id]
        );
        return result[0][0];
    },

    updateGallery : async(data)=>{
        const {id, category_id, serivce_name, service_image, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_gallery(?,?,?,?,?)",
            [id, category_id, serivce_name, service_image, updatedBy]
        );

        return rows;
    },

    deleteGallery : async(data)=>{
        const {id, updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_gallery(?,?)",
            [id, updatedBy]
        );

        return rows;
    }
}