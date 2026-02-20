import db from "../config/db.js"

//count data for dashboard
export const dashboarModel = {
 
    getDashboardCount: async()=>{
        const [result] = await db.query("CALL sp_get_dashboard_counts()");
        return result[0][0];
    },

    getWeeklyAppointment : async()=>{
        const [result] = await db.query("CALL sp_get_weekly_appointments()");
        return result[0];
    },

    getMonthlyOrder: async()=>{
        const [result] = await db.query("CALL sp_get_monthly_order()");
        return result[0];
    },

    gettodatAppoitment: async()=>{
        const [result] = await db.query("CALL sp_get_today_appointments()");
        return result[0];
    },

    getRecentOrder : async()=>{
        const [result] = await db.query("CALL sp_get_recent_ordes()");
        return result[0];
    },

    getRecentLead : async()=>{
        const [result] = await db.query("CALL sp_get_recent_leads()");
        return result[0];
    }
}