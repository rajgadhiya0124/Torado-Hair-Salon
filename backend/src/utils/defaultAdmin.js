import bcrypt from "bcrypt"
import db from "../config/db.js";


export const createDefaultadmin = async()=>{
    try {
        const name = "admin";
        const email = "admin@gmail.com";
        const password = "admin123";
        const role = "admin";

        const hashedPassword = await bcrypt.hash(password,10);

        const [rows] = await db.query(
            "SELECT * FROM tbl_users WHERE role=? AND email=?",
            [role,email]
        )

        if(rows.length === 0){
            await db.query(
                "INSERT INTO tbl_users (name, email, password, role) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, role]
            )
            console.log(" Default admin created!");
        }else{
            console.log("Admin already exists.");
        }

    } catch (error) {
        console.error("Error creating default admin:", error.message)
    }
}