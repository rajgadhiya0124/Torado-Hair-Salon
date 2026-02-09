import { homeAboutModel } from "../models/home.aboutus.model.js"

//cretae Home About
export const createHomeAbout = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            about_image: req.file ? req.file.filename : null,
            createdBy : req.user ? req.user.id : null
        }

        await homeAboutModel.createHomeAbout(data);

        res.status(200).json({
            success: true,
            message: "Home About Created"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//get home about
export const getHomeAbout = async(req,res)=>{
    try {
        const homeabout = await homeAboutModel.getHomeAbout();

        res.status(200).json({
            success: true,
            data: homeabout
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//update home aboutus
export const updateHomeAbout = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.user ? req.user.id : null,
            about_image: req.file ? req.file.filename : null,
            updatedBy : req.user ? req.user.id : null, 
        }

        await homeAboutModel.updateHomeAbout(data);

        res.status(200).json({
            success: true,
            message: "Home About updated..."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//delete home about
export const deleteHomeAbout = async(req,res)=>{
    try {
        
        const data ={
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await homeAboutModel.deleteHomeAbout(data);

        res.status(200).json({
            success: true,
            message: "Home About deleted..."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}