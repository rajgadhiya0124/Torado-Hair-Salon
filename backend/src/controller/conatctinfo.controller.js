import { ContactInfoModel } from "../models/contactinfo.model.js"


export const createContactInfo = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy: req.user? req.user.id : null
        }

        await ContactInfoModel.createContactInfo(data);

        res.status(200).json({
            success:true,
            message:"Contact info created successfully"
        })
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//get all contactinfo
export const getAllContactInfo = async(req,res)=>{
    try {

        const contactinfo = await ContactInfoModel.getAllContactInfo();

        res.status(200).json({
            success:true,
            data: contactinfo
        })
        
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//update contactInfo
export const updateContactInfo = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy : req.user? req.user.id : null
        }

        await ContactInfoModel.updateContactInfo(data);

        res.status(200).json({
            success:true,
            message:"Contact info Updated successfully"
        })
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//delete contact info
export const deleteContactInfo = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await ContactInfoModel.deleteContactInfo(data);

        res.status(200).json({  
            success: true,
            message: "Contact info deleted successfully",
        });
        
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}