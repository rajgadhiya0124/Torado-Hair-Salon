import { leadModel } from "../models/lead.model.js";
import { notificationModel } from "../models/notification.modal.js";

//create lead
export const createLead = async(req,res)=>{
    try {
        const {user_name,email,company} = req.body
        const createdBy = req.user ? req.user.id : null;

        const result = await leadModel.createLead({user_name,email,company,createdBy});

        const lead_id = result.lead_id;

        await notificationModel.createNotification({
            title: "New Lead Received",
            message: `New inquiry received from #${user_name}`,
            type: "lead",
            reference_id: lead_id
        })

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

//update Lead toogle (Active,deactive) status
export const updateleadtoogleStaus = async(req,res)=>{
    try {
        const data ={
            id:req.params.id,
            updatedBy: req.user? req.user.id : null,
        }

        await leadModel.updateleadtoogleStaus(data);

        res.status(200).json({
            success:true,
            message:"lead toogle Status updated Sucssfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update lead Status
export const updateLeadStatus = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            lead_status: req.body.lead_status,
            updatedBy: req.user ? req.user.id : null,
        }

        await leadModel.updateLeadStatus(data);

        res.status(200).json({
            success: true,
            message: "Lead Status updated",
        });
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