import db from "../config/db.js"


export const privcyModel ={
    createPrivacy: async(data)=>{
        const {sub_title,title, content, createdBy} = data;
        const [rows] = await db.query("CALL sp_create_privacy_policy(?,?,?,?)",
            [sub_title,title, content, createdBy]
        );

        return rows;
    },

    getPrivcay : async()=>{
        const [result] = await db.query("CALL sp_get_privacy_policy()");

        return result[0][0];
    },

    updatePrivcy: async(data)=>{
        const {id,sub_title, title, content, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_privacy_policy(?,?,?,?,?)",
            [id,sub_title, title, content,updatedBy]
        );

        return rows;
    },

    deletePrivcy : async(data)=>{
        const {id,updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_privacy_policy(?,?)",
            [id, updatedBy]
        );

        return rows;
    }
}