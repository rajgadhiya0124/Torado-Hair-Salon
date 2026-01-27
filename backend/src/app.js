import express from "express";
import cors from "cors"
import contactRoutes from "./router/contactinfo.router.js"
import contactUsRoutes from "./router/contactus.router.js"
import userRoutes from "./router/user.router.js"

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/contactInfo",contactRoutes);
app.use("/api/contactus",contactUsRoutes);

app.use("/api/user",userRoutes)

export default app;