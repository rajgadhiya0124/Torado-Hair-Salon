import { GalleryCatModel } from "../models/gallery.category.model.js";

//create gallery category
export const createGalleryCat = async(req,res)=>{
    try {
        const data ={
            category_name : req.body.category_name,
            createdBy : req.user ? req.user.id : null
        }

        await GalleryCatModel.createGalleryCat(data);

        res.status(200).json({
            success:true,
            message:"Gallery category created ..."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all gallery category
export const getAllGalleryCat =async(req,res)=>{
    try {
        const cataegory = await GalleryCatModel.getAllCategory();

        res.status(200).json({
            success:true,
            data: cataegory
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete Galllery category
export const deleteGalleryCat = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        };

        await GalleryCatModel.deleteGalleryCat(data);

        res.status(200).json({
            success:true,
            message:"Gallery category Deleted ..."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}