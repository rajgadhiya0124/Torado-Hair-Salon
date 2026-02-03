import db from "../config/db.js"

export const leadModel = {
    createLead: async(data)=>{
        const {user_name , email, company, createdBy} = data;

        const [rows] = await db.query("CALL sp_create_lead (?,?,?,?)",
            [user_name , email, company, createdBy]
        );

        return rows;
    },

    getAllLead : async()=>{

        const [result] = await db.query("CALL sp_get_all_leads ()");

        return result[0];
    },

    delteLead : async(data)=>{
        const {id, updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_lead(?,?)",
            [id, updatedBy]
        );

        return rows;
    }
}