import multer from "multer"
import fs from "fs"
import path from "path"

const storage = (folderName)=>
    multer.diskStorage({
        destination:(req,file,cb)=>{
            const uploadPath = path.join(process.cwd(),"uploads",folderName);

            if(!fs.existsSync(uploadPath)){
                fs.mkdirSync(uploadPath, {recursive:true})
            }

            cb(null ,uploadPath);
        },
        filename:(req, file , cb)=>{
            
            const uniqueName = 
            Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueName + path.extname(file.originalname));
        }
    })

    const fileFilter = (req,file,cb)=>{
    if(
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/webp"
    )
    {
        cb(null, true)
    } else{
        cb(new Error("Only image files allowed"), false);
    }
}

export const upload = (folderName)=>{
    return multer({
        storage: storage(folderName),
        limits: { fileSize: 2 * 1024 * 1024 },
        fileFilter
    })
}