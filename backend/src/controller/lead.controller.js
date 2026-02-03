import { leadModel } from "../models/lead.model.js";

//create lead
export const createLead = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy : req.user ? req.user.id: null,
        }

        await leadModel.createLead(data);

        res.status(200).json({
            success:true,
            message:"Lead Form Submitted Sucssfully.."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all leads
export const getAllLeads = async(req,res)=>{
    try {
        const leads = await leadModel.getAllLead();

        res.status(200).json({
            success:true,
            data : leads
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete leads
export const deleteLead = async(req,res)=>{
    try {
        const data ={
            id: req.params.id,
            updatedBy: req.user ? req.user.id: null,
        }

        await leadModel.delteLead(data);

        res.status(200).json({
            success:true,
            message:"Lead deleted Sucssfully.."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}