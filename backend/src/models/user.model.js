import db from "../config/db.js";

export const UserModel = {
    createUser: async(data)=>{
        const {name,email,password,createdBy} = data;

        const [rows] = await db.query("CALL sp_create_user(? ,? ,? ,?)",
            [name,email,password,createdBy]
        );
        return rows;
    },

    loginUser:async(id)=>{
        
        const [rows] = await db.query("CALL sp_login_user(?)",[id]);
        
        return rows[0][0]
    },

    getAllser: async()=>{
        const [result] = await db.query("CALL sp_get_all_users()");

        return result[0];
    },

    deleteUser: async(data) =>{
        const {userId, updatedBy} = data;

       

        const [rows]= await db.query("CALL sp_delete_user(?, ?)",
            [userId,updatedBy]
        );
        return rows;
    }
}