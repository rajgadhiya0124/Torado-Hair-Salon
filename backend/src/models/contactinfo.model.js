import db from "../config/db.js";


export const ContactInfoModel = {
    createContactInfo: async(data)=>{
        const {type,title,value_1,value_2,createdBy} = data;

        const [rows] = await db.query("CALL sp_create_contactinfo(?,?,?,?,?)",
            [type, title, value_1, value_2, createdBy]
        )
        return rows;
    },

    getAllContactInfo: async()=>{
        const [result] = await db.query("CALL sp_get_all_contactinfo()")

        return result[0];
    },

    updateContactInfo: async(data)=>{
        const {id, type,title,value_1,value_2,updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_contact_info(? ,?, ?, ?, ?, ?)",
            [id, type,title,value_1,value_2,updatedBy]
        )
        return rows;
    },

    deleteContactInfo: async(data)=>{
        const {id,updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_contact_info(?,?)",
            [id,updatedBy]
        )
        return rows;
    }
} 