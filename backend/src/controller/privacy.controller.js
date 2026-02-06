import { privcyModel } from "../models/privacy.model.js";

//create Privcy
export const createPrivacy = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy: req.user ? req.user.id : null,
        }

        await privcyModel.createPrivacy(data);

        res.status(200).json({
            success: true,
            message: "Privcy Created",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get privcy
export const GetPrivcy = async(req,res)=>{
    try {
        const privacy = await privcyModel.getPrivcay();

        res.status(200).json({
            success: true,
            data : privacy,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update Privacy
export const updatePrivacy = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        }

        await privcyModel.updatePrivcy(data);
         
        res.status(200).json({
            success: true,
            message : "Privcy Updated successfully.."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete privcy
export const deletePrivacy = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await privcyModel.deletePrivcy(data);

        res.status(200).json({
            success: true,
            message: "Privcy Policy Deleted",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}