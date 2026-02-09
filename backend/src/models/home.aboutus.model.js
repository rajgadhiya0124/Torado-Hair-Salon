import db from "../config/db.js";


export const homeAboutModel = {
    createHomeAbout: async(data)=>{
        const {about_image, sub_title, main_title, small_description, 
    second_title, second_description, contact_no, createdBy} = data;

    const [rows] = await db.query("CALL sp_create_home_aboutus(?,?,?,?,?,?,?,?)",
        [about_image, sub_title, main_title, small_description, 
        second_title, second_description, contact_no, createdBy]
    );

    return rows;
    },

    getHomeAbout: async()=>{
        const [result] = await db.query("CALL sp_get_home_aboutus()");

        return result[0][0];
    },

    updateHomeAbout: async(data)=>{
        const {id, about_image, sub_title, main_title, small_description, 
        second_title, second_description, contact_no, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_home_aboutus(?,?,?,?,?,?,?,?,?)",
            [id, about_image, sub_title, main_title, small_description, 
            second_title, second_description, contact_no, updatedBy]
        )

        return rows;
    },

    deleteHomeAbout: async(data)=>{
        const {id, updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_home_aboutus(?,?)",
            [id,updatedBy]
        );

        return rows;
    }
}