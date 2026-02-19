import db from "../config/db.js"


export const BestPriceServiceModal = {
    getBestPriceService : async()=>{
        
        const [result] = await db.query("CALL sp_get_bestprice_service()");
        return result[0];
    }
} 