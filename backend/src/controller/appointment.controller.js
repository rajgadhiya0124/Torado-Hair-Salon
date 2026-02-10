import { AppointmentModel } from "../models/appointment.model.js"
import { sendEmail } from "../utils/mailer.js";


//create appointemnent or make appointment
export const createAppointment = async(req,res)=>{
    try {

        const {customer_name,customer_email,customer_phone, 
            persons, appointment_date, address, message} = req.body;

        const createdBy = req.user ? req.user.id : null;
        // const data = {
        //     ...req.body,
        //     createdBy : req.user ? req.user.id : null
        // }

        await sendEmail({
            to:customer_email,
            subject:"Appointment Confirmation",
            html:`
                <h2>Hello ${customer_name},</h2>
                <p>Your appointment has been successfully booked.</p>
                <p><strong>Appointment Date:</strong> ${appointment_date}</p>

                <p>We will contact you if any changes are required.</p>
                <br/>
                <p>Thank you,<br/>Hair Salon Team</p>
            `
        })

        await AppointmentModel.createAppointment({customer_name,customer_email,customer_phone, 
            persons, appointment_date, address, message,createdBy});
        
        res.json({
            success:true,
            message: "Appointment submitted Sucssfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

//get all appointment
export const getAllAppointment = async(req,res)=>{
    try {
        const appointment = await AppointmentModel.getAllAppointment();

        res.json({
            success:true,
            data:appointment
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

///delete appointment
export const deleteAppointment = async(req,res)=>{
    try {
        const data = {
            id:req.params.id,
            updatedBy:  req.user ? req.user.id : null,
        }

        const result = await AppointmentModel.deleteAppointment(data);

        res.json({
            success:true,
            message: "Appointment Deleted Sucssfully",
            result
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}