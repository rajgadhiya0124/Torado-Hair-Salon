import { contactUsModel } from "../models/contactus.model.js";
import { sendContactInformationEmail } from "../utils/mailer.js";


//create contactus
export const createContacus = async(req,res)=>{
    try {
        const {name,email,phone,subject,message} = req.body;
        
        const createdBy = req.user ? req.user.id : null;

        await contactUsModel.createContactUs({name,email,phone,subject,message,createdBy});

        await sendContactInformationEmail({name,email,subject})

        res.status(200).json({
            success:true,
            message:"ContactUs created successfully"
        })
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//get all contaus
export const getAllContactUs = async(req,res)=>{
    try {
    
        const contactus = await contactUsModel.getAllContactUs();

         res.status(200).json({
            success:true,
            data: contactus
        })
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//deelte contactus
export const deletContactUs = async(req,res)=>{
    try {
        const data = {
            id: req.params.id,
            updatedBy : req.user ? req.user.id : null,
        }   

        await contactUsModel.deleteContactUs(data);

        res.status(200).json({  
            success: true,
            message: "Contactus deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}