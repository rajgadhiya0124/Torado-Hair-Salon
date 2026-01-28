import { AppointmentModel } from "../models/appointment.model.js"


//create appointemnent or make appointment
export const createAppointment = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy : req.user ? req.user.id : null
        }

        await AppointmentModel.createAppointment(data);
        
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