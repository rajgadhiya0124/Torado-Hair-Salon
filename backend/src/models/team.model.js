import db from "../config/db.js";

export const TeamModel = {

    createTeam: async(data)=>{
        const {person_name, person_image, person_role, createdBy } = data;

        const [rows] = await db.query("CALL sp_create_team_member(?,?,?,?)",
            [person_name, person_image, person_role, createdBy]
        );

        return rows;
    },

    getAllTeam : async()=>{
        const [result] = await db.query("CALL sp_get_team_members()");

        return result[0];
    },

    getTeamById: async(id)=>{
        const  [result] = await db.query("CALL sp_get_team_member_by_id(?)",
            [id]
        );

        return result[0];
    },

    updateTeam: async(data)=>{
        const {id, person_name, person_image, person_role, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_team_member(?,?,?,?,?)",
            [id, person_name, person_image, person_role, updatedBy]
        );

        return rows;
    },

    deleteTeam: async(data)=>{
        const {id,updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_team_member(?,?)",
            [id,updatedBy]
        );

        return rows;
    }
}