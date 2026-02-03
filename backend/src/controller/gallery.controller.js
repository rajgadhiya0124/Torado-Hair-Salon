import { GalleryModel } from "../models/gallery.model.js";


//create Gallery
export const createGallery = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            service_image : req.file ? req.file.filename : null,
            createdBy : req.user ? req.user.id : null,
        }

        await GalleryModel.createGallery(data);

        res.status(200).json({
            success:true,
            message:"Gallery created Sucssfully.."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all gallery
export const getAllGallery = async(req,res)=>{
    try {
        const gallery = await GalleryModel.getAllGallery();

        res.status(200).json({
            success:true,
           data : gallery
        });        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get Gallery bu id or singlwe gallery
export const getGalleryById = async(req,res)=>{
    try {
        const id = req.params.id;

        const gallery = await GalleryModel.getGalleryById(id);

        res.status(200).json({
            success:true,
            data: gallery
        });  

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
}

//update Gallery
export const updateGallery = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            service_image : req.file ? req.file.filename : null,
            updatedBy : req.user ? req.user.id : null,
        }

        await GalleryModel.updateGallery(data);

        res.status(200).json({
            success:true,
            message: "Gallery updated successfully..."
        }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//delete Gallery
export const deleteGallery = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null
        }

        await GalleryModel.deleteGallery(data);

        res.status(200).json({
            success:true,
            message: "Gallery delete successfully..."
        }); 

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        }); 
    }
} 