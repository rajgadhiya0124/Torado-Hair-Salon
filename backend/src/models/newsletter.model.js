import db from "../config/db.js"


export const NewsletterModel = {
    createNewsletter: async(email,createdBy)=>{

        const [rows] = await db.query("CALL sp_create_newsletter(?,?)",
            [email,createdBy]
        );

        return rows;
    },

    getAllNewsletter : async()=>{
        const [result] = await db.query("CALL sp_get_all_newsletters()");

        return result[0];
    },

    deleteNewletter: async( id, updatedBy)=>{
        const [rows] = await db.query("CALL sp_delete_newsletter(?,?)",
            [id,updatedBy]
        );

        return rows;
    }
}