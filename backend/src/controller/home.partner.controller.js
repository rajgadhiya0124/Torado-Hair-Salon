import { homePartnerModel } from "../models/home.partner.model.js";

//create Home Partner
export const createHomePartner = async(req,res)=>{
    try {
        const data = {
            partner_image: req.file ? req.file.filename : null,
            createdBy: req.user ? req.user.id : null
        }

        await homePartnerModel.createHomePartnter(data);

        res.status(200).json({
            success:true,
            message:"Home Parnter Create"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//get alll home partner
export const getHomePartner = async(req,res)=>{
    try {
        const partner = await homePartnerModel.getHomePartner();

        res.status(200).json({
            success:true,
            data : partner
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//delete home partner
export const deleteHomePartner = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy: req.user ? req.user.id : null,
        }

        await homePartnerModel.deleteHomePartner(data);

        res.status(200).json({
            success:true,
            message:"Home Partner Deleted"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}