import { NewsletterModel } from "../models/newsletter.model.js";
import { notificationModel } from "../models/notification.modal.js";


//create newsletter
export const createNewsletter = async(req,res)=>{
    try {
        const {email} = req.body;
        const createdBy = req.user ? req.user.id : null

        const existEmail = await NewsletterModel.checkEmailExists(email);
        if(existEmail){
            return res.status(400).json({
                success: false,
                message: "Email already subscribed"
            });
        }

        const result = await NewsletterModel.createNewsletter(email,createdBy);

        const newsletter_id = result.newsletter_id;

        await notificationModel.createNotification({
            title: "New Newsletter Subscriber",
            message: `${email} subscribed to the newsletter`,
            type: "newsletter",
            reference_id: newsletter_id
        })
        
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
