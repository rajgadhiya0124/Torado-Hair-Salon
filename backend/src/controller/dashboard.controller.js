import db from "../config/db.js";
import { dashboarModel } from "../models/dashboard.model.js"


//dashboard count
export const dashBoardCount = async(req,res)=>{
    try {
        const totalCount = await dashboarModel.getDashboardCount();

        res.status(200).json({
            success: true,
            data: totalCount
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

//get weekly appointment
export const getWeeklyAppointment = async(req,res)=>{
    try {
        const weeklyAppointment = await dashboarModel.getWeeklyAppointment();

        res.status(200).json({
            success: true,
            data: weeklyAppointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

//get monthly order
export const getMonthlyOrder = async(req,res)=>{
    try {
        const montlyOrder = await dashboarModel.getMonthlyOrder();

        res.status(200).json({
            success: true,
            data: montlyOrder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

//get today appointment
export const getTodayAppointment = async(req,res)=>{
    try {
        const todayAppointment = await dashboarModel.gettodatAppoitment();

        res.status(200).json({
            success: true,
            data: todayAppointment
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

//get recent order
export const getRecentOrder = async(req,res)=>{
    try {
        const recentOrder = await dashboarModel.getRecentOrder();

        res.status(200).json({
            success: true,
            data: recentOrder
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}

//get recent leads
export const getRecentLeads = async(req,res)=>{
    try {
        const recentLeads = await dashboarModel.getRecentLead();

        res.status(200).json({
            success: true,
            data: recentLeads
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}