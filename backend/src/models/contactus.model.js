import db from "../config/db.js";


export const contactUsModel = {
    createContactUs : async(data)=>{
        const {name, email, phone, subject, message, createdBy} = data;

        const [rows] = await db.query("CALL sp_create_contactus(?, ?, ?, ?, ?, ?)",
            [name, email, phone, subject, message, createdBy]
        )
        return rows;
    },

    getAllContactUs: async()=>{
        const [result] = await db.query("CALL sp_get_all_contactus()");

        return result[0]
    },

    deleteContactUs: async(data)=>{
        const {id,updatedBy} = data;

        const [result] = await db.query("CALL sp_delete_contactus (?, ?)",
            [id,updatedBy]
        )
        return result
    }
}