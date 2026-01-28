import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import { createDefaultadmin } from "./utils/defaultAdmin.js";


dotenv.config();

createDefaultadmin();

const PORT = process.env.PORT; 

app.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`);
})
