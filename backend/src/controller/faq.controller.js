import { FaqModel } from "../models/faq.model.js";

//create faq
export const createFaq = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            createdBy : req.user ? req.user.id : null,
        }

        await FaqModel.createFaq(data);

        res.status(200).json({
            success:true,
            message:"Faq created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all faq
export const getAllFaq =  async(req,res)=>{
    try {
        const faq = await FaqModel.getAllFaq();

        res.status(200).json({
            success:true,
            data: faq
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update faq
export const updateFaq = async(req,res)=>{
    try {

        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy: req.user ? req.user.id : null,
        }

        await FaqModel.updateFaq(data);

        res.status(200).json({
            success:true,
            message:"Faq Updated successfully"
        })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete faq
export const deleteFaq = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        }

        await FaqModel.deleteFaq(data);

        res.status(200).json({
            success:true,
            message:"Faq Deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}