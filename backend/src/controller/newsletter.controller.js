import { NewsletterModel } from "../models/newsletter.model.js";


//create newsletter
export const createNewsletter = async(req,res)=>{
    try {
        const {email} = req.body;
        const createdBy = req.user ? req.user.id : null

        await NewsletterModel.createNewsletter(email,createdBy);
        
        res.status(200).json({
            success:true,
            message:"User Subscribe Successfully"
        })
        
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//get all result
export const getAllNewsletter = async(req,res)=>{
    try {
        const newsletter = await NewsletterModel.getAllNewsletter();

        res.status(200).json({
            success:true,
            data: newsletter,
        })

    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//delete newsletter
export const deleteNewletter = async(req,res)=>{
    try {
        const id = req.params.id;
        const updatedBy = req.user ? req.user.id : null;

        const result = await NewsletterModel.deleteNewletter(id,updatedBy);

        res.status(200).json({
            success:true,
            message:"Newsetter Deleted",
            result
        })

    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}
