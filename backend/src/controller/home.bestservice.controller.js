import { BestPriceServiceModal } from "../models/home.bestservice.model.js"


//get best price service for Home best price service section
export const getBeastPriceService = async(req,res)=>{
    try {
        const bestpriceserive = await BestPriceServiceModal.getBestPriceService();

        res.status(200).json({
            success: true,
            data : bestpriceserive
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message : error.message
        })
    }
}