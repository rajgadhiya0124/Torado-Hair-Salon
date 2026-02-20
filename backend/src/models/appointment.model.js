import db from "../config/db.js";


export const AppointmentModel = {
    createAppointment: async(data)=>{
        const {customer_name,customer_email,customer_phone, 
            persons,service_id, appointment_date,appointment_time, address, message, createdBy}= data;

        const [rows]= await db.query("CALL sp_create_appointment(?,?,?,?,?,?,?,?,?,?)",
            [customer_name,customer_email,customer_phone, 
            persons,service_id, appointment_date,appointment_time, address, message, createdBy]
        );
        return rows;
    },

    getAllAppointment: async()=>{
        const [result] = await db.query("CALL sp_get_all_appointments()")
        
        return result[0];
    },

    updateAppointmentStatus : async(data)=>{
        const {id, appointment_status, updatedBy} = data;

        const [rows] = await db.query("CALL sp_update_appointment_status(?,?,?)",
            [id, appointment_status, updatedBy]
        );
        return rows;
    },

    deleteAppointment: async(data)=>{
        const {id,updatedBy} = data;

        const [rows] = await db.query("CALL sp_delete_appointment(?, ?)",
            [id,updatedBy]
        );

        return rows
    }
}