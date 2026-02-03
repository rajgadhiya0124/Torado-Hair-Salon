import { TeamModel } from "../models/team.model.js";


//create team meembers
export const createTeam = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            person_image: req.file ? req.file.filename : null,
            createdBy : req.user ? req.user.id : null,
        }

        await TeamModel.createTeam(data);

        res.json({
            success: true,
            message: "Team Member Created successfully..",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get all team
export const getAllTeam = async(req,res)=>{
    try {
        const team = await TeamModel.getAllTeam();

        res.json({
            success: true,
            data : team
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//get team By Id
export const getTeamById = async(req,res)=>{
    try {
        
        const id = req.params.id;

        const team = await TeamModel.getTeamById(id);

        res.json({
            success: true,
            data : team
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//update Team 
export const updateTeam = async(req,res)=>{
    try {
        const data = {
            ...req.body,
            id: req.params.id,
            person_image: req.file ? req.file.filename : null,
            updatedBy : req.user ? req.user.id : null, 
        }

        await TeamModel.updateTeam(data);

        res.json({
            success: true,
            message: "Team Member Updated successfully..",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//delete team member
export const deleteTeam = async(req,res)=>{
    try {
        const data ={
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null, 
        }

        await TeamModel.deleteTeam(data);

        res.json({
            success: true,
            message: "Team Member Deleted successfully..",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}