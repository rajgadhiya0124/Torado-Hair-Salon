import { termsModel } from "../models/terms.model.js";

//create terms
export const createTerms = async(req,res)=>{
    try {

        const data = {
            ...req.body,
            createdBy: req.user ? req.user.id : null
        };

        await termsModel.createTerms(data);

        res.status(200).json({
            success: true,
            message: "Terms & Conditions Created"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//get terms
export const getTerms = async(req,res)=>{
    try {

        const data = await termsModel.getTerms();

        res.status(200).json({
            success:true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//update terms
export const updateTerms = async(req,res)=>{
    try {

        const data = {
            ...req.body,
            id: req.params.id,
            updatedBy: req.user ? req.user.id : null
        };

        await termsModel.updateTerms(data);

        res.status(200).json({
            success:true,
            message:"Terms Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//delete terms
export const deleteTerms = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy: req.user ? req.user.id : null,
        }
        await termsModel.deleteTerms(data);

        res.status(200).json({
            success:true,
            message:"Terms Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

