import db from "../config/db.js";

export const termsModel = {

    // Create
    createTerms: async(data)=>{
        const { sub_title, title, content, createdBy } = data;

        const [rows] = await db.query(
            "CALL sp_create_terms_conditions(?,?,?,?)",
            [sub_title, title, content, createdBy]
        );

        return rows;
    },

    getTerms: async()=>{
        const [rows] = await db.query(
            "CALL sp_get_terms_conditions()"
        );

        return rows[0][0];
    },

    
    // Update
    updateTerms: async(data)=>{
        const { id, sub_title, title, content, updatedBy } = data;

        const [rows] = await db.query(
            "CALL sp_update_terms_conditions(?,?,?,?,?)",
            [id, sub_title, title, content, updatedBy]
        );

        return rows;
    },

     // Delete
    deleteTerms: async(data)=>{
        const {id, updatedBy} = data;
        const [rows] = await db.query(
            "CALL sp_delete_terms_conditions(?,?)",
            [id, updatedBy]
        );

        return rows;
    }

}