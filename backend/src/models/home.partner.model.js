import db from "../config/db.js"

export const homePartnerModel ={

    createHomePartnter: async(data)=>{
        const{partner_image,createdBy} = data;

        const [rows] = await db.query("CALL sp_create_home_partner (?,?)",
            [partner_image, createdBy]
        );
        return rows;
    },

    getHomePartner: async()=>{

        const [result] = await db.query("CALL sp_get_home_partners()");

        return result[0];
    },

    deleteHomePartner: async(data)=>{
        const {id,updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_home_partner(?,?)",
            [id,updatedBy]
        );

        return rows;
    }
}