import { json } from "express";
import bcrypt from "bcrypt"
import { UserModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";


//register user or create new user
export const createUser = async(req,res)=>{
    try {
        const {name , email ,password,confirm_password} = req.body;

        const createdBy = req.user ? req.user.id : 1

        const existingUser = await UserModel.loginUser(email);

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if(!name|| !email || !password || !confirm_password){
            res.status(402).json({
                success: false,
                message: "All feelids Are Required"
            })
        }

        if(password !== confirm_password){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password do not match"
            });
        } 

        const hasePassword = await bcrypt.hash(password,10);

        await UserModel.createUser({name,email,password:hasePassword,createdBy});

        res.status(201).json({
            success:true, 
            message: "User registered successfully" 
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        }); 
    }
} 

//login user
export const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(404).json({ message: "Email And Password is required" });
        }

        const user = await UserModel.loginUser(email);

        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {id: user.id , email: user.email, role:user.role},
                process.env.JWT_SECRET,
            {
                expiresIn:"20d"
            }
        )

        res.json({
            success : true,
            token,
            user:{
                id:user.id,
                name:user.name,
                email: user.email,
                role:user.role
            }
        })

    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}


//get all user
export const getAlluser = async(req,res)=>{
    try {
        const users = await UserModel.getAllser();

        res.status(201).json({
            sucess:true, 
            data:users
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
} 

//get admin all user active and inactive
export const getAllAdmimUser = async(req,res)=>{
    try {
        const adminuser = await UserModel.getAllAdminUser();

        res.status(201).json({
            sucess:true, 
            data:adminuser
        });
    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}

//delete user
export const deleteUser = async(req,res)=>{
    try {
        const data = {
            userId: req.params.userId,
            updatedBy: req.user ? req.user.id : null,
        }

        const result = await UserModel.deleteUser(data);


        res.status(201).json({
            sucess:true, 
            message: "User Deleted Successfully" ,
            result
        });

    } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
    }
}