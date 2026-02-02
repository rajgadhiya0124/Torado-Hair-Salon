import db from "../config/db.js";

export const serviceModel = {
    createService: async(data)=>{
        const {service_name,service_icon,service_image,price,
            service_video,service_video_bg,service_description,createdBy} = data;

        const [rows] = await db.query("CALL sp_create_service(?,?,?,?,?,?,?,?)",
            [service_name,service_icon,service_image,price,
            service_video,service_video_bg,service_description,createdBy]
        );

        return rows;
    },

    getAllServices: async()=>{
        const [result] = await db.query("CALL sp_get_all_services()");

        return result[0];
    },

    getServiceByid: async(id)=>{
        const [result] = await db.query("CALL sp_get_service_by_id(?)",
            [id]
        );

        return result[0][0];
    },

    updateService: async(data)=>{
        const {id,service_name,service_icon,service_image,price,
            service_video,service_video_bg,service_description,is_top,updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_service(?,?,?,?,?,?,?,?,?,?)",
            [id,service_name,service_icon,service_image,price,
            service_video,service_video_bg,service_description,is_top,updatedBy]
        );

        return rows;
    },

    deleteService: async(data)=>{
        const {id, updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_service(?,?)",
            [id,updatedBy]
        );

        return rows;
    },

    getTopService : async()=>{
        const [result] = await db.query("CALL sp_get_top_services()");

        return result[0];
    }
}