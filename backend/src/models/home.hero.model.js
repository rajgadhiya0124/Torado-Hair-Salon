import db from "../config/db.js"

export const homeHeroModel = {
    createHero: async(data)=>{
        const {logo_image,heading_one, heading_two, hero_image, background_image,createdBy} = data;

        const [rows] = await db.query("CALL sp_create_home_hero(?,?,?,?,?,?)",
            [logo_image,heading_one, heading_two, hero_image, background_image,createdBy]
        );

        return rows;
    },

    getHero: async()=>{
        const [rows] = await db.query("CALL sp_get_home_hero()");

        return rows[0][0];
    },

    updateHero: async(data)=>{
        const {
            id,logo_image,heading_one,heading_two,hero_image,background_image,updatedBy
        } = data;

        const [rows] = await db.query(
            "CALL sp_update_home_hero(?,?,?,?,?,?,?)",
            [
                id,
                logo_image,
                heading_one,
                heading_two,
                hero_image,
                background_image,
                updatedBy
            ]
        );

        return rows;
    },

    deleteHero: async(data)=>{
        const{id,updatedBy} = data;
        
        const [rows] = await db.query(
            "CALL sp_delete_home_hero(?,?)",
            [id, updatedBy]
        );

        return rows;
    }
}