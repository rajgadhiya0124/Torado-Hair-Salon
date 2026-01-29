import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import path from "path"
import { createDefaultadmin } from "./utils/defaultAdmin.js";


dotenv.config();

createDefaultadmin();

app.use("/uploads",express.static(path.join(process.cwd(),"uploads")));

const PORT = process.env.PORT; 

app.listen(PORT,()=>{
    console.log(`Server running on port:${PORT}`);
})
