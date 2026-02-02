import { serviceModel } from "../models/service.model.js";

//create service
export const CreateService = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            service_icon : req.files?.service_icon ? req.files.service_icon[0].filename : null,
            service_image : req.files?.service_image ? req.files.service_image[0].filename : null,
            service_video_bg: req.files?.service_video_bg ? req.files.service_video_bg[0].filename : null,
            createdBy : req.user ? req.user.id : null
        }

        await serviceModel.createService(data);

        res.json({
            success: true,
            message: "Service Created Sucssfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all services
export const getAllServices = async(req,res)=>{
    try {
        
        const service = await serviceModel.getAllServices();

        res.json({
            success: true,
            data: service
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get service By Id
export const getServiceById = async(req,res)=>{
    try {
        const id = req.params.id;

        const service = await serviceModel.getServiceByid(id);

        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update service
export const updateService = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            ...req.body,
            service_icon : req.files?.service_icon ? req.files.service_icon[0].filename : null,
            service_image : req.files?.service_image ? req.files.service_image[0].filename : null,
            service_video_bg: req.files?.service_video_bg ? req.files.service_video_bg[0].filename : null,
            updatedBy : req.user ? req.user.id : null
        }

        await serviceModel.updateService(data);

        res.json({
            success: true,
            message: "Service Updated Sucssfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete service
export const deleteService  = async(req,res)=>{
    try {
        const data={
            id:req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }

        await serviceModel.deleteService(data);

        res.json({
            success: true,
            message: "Service Deleted Sucssfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get top services
export const getTopService = async(req,res)=>{
    try {
        const topservice = await serviceModel.getTopService();

        res.json({
            success: true,
            data: topservice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}