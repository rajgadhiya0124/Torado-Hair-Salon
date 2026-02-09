import { homeHeroModel } from "../models/home.hero.model.js";

//create home hero
export const createHero = async(req,res)=>{
    try {
        const data ={
            ...req.body,
            logo_image: req.files?.logo_image ? req.files.logo_image[0].filename : null,
            hero_image: req.files?.hero_image ? req.files.hero_image[0].filename : null,
            background_image: req.files?.background_image ? req.files.background_image[0].filename : null,
            createdBy: req.user ? req.user.id : null
        }

        await homeHeroModel.createHero(data);

        res.status(200).json({
            success:true,
            message:"Home Hero Created"
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//get hero
export const getHomeHero = async(req,res)=>{
    try {

        const data = await homeHeroModel.getHero();

        res.status(200).json({
            success:true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//update hero
export const updateHomeHero = async(req,res)=>{
    try {

        const data = {
            ...req.body,
            id: req.params.id,
            logo_image: req.files?.logo_image ? req.files.logo_image[0].filename : null,
            hero_image: req.files?.hero_image ? req.files.hero_image[0].filename : null,
            background_image: req.files?.background_image ? req.files.background_image[0].filename : null,
            updatedBy: req.user ? req.user.id : null
        };

        await homeHeroModel.updateHero(data);

        res.status(200).json({
            success:true,
            message:"Home Hero Updated"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};


//delete hero
export const deleteHomeHero = async(req,res)=>{
    try {
        const data = {
            id:req.params.id,
            updatedBy: req.user ? req.user.id : null,
        }
        
        await homeHeroModel.deleteHero(data);

        res.status(200).json({
            success:true,
            message:"Home Hero Deleted"
        });

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
