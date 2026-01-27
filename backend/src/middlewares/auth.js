import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

const verifyToken = async(req,res,next)=>{
    try {
        const authHeaders = req.headers.authorization;

        if(!authHeaders){
            return res.status(401).json({ message: "Token required" });
        }

        const Token = authHeaders.split(" ")[1];
        
        if(!Token){
            return res.status(401).json({ message: "Invalid token" });
        }


        jwt.verify(Token, process.env.JWT_SECRET,(err,decoded)=>{
            if (err) {
                return res.status(401).json({ message: "Token invalid or expired" });
            }

            req.user = decoded;
            next();
        })
    } catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}


export default verifyToken;