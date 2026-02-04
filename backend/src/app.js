import express from "express";
import cors from "cors"
import contactRoutes from "./router/contactinfo.router.js"
import contactUsRoutes from "./router/contactus.router.js"
import userRoutes from "./router/user.router.js"
import appointmentRoutes from "./router/appointment.router.js"
import newsletterRoutes from "./router/newsletter.router.js"
import faqRoutes from "./router/faq.router.js"
import blogCategoryRoutes from "./router/blog.category.router.js"
import blogTagRoutes from "./router/blog.tag.router.js"
import blogAuthorRoutes from "./router/blog.author.router.js"
import blogRoutes from "./router/blog.router.js"
import blogCommentRoutes from "./router/blog.comment.router.js"
import serviceRoutes from "./router/service.router.js"
import teamRoutes from "./router/team.router.js"
import leadRoutes from "./router/lead.router.js"
import galleryCatRoutes from "./router/gallery.category.router.js"
import galleryRoutes from "./router/gallery.router.js"
import productCatRoutes from "./router/product.category.router.js"
import productTagRoutes from "./router/product.tag.router.js"
import productRoutes from "./router/product.router.js"

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/contactInfo",contactRoutes);
app.use("/api/contactus",contactUsRoutes);

app.use("/api/blogCategory",blogCategoryRoutes);
app.use("/api/blogTag",blogTagRoutes);
app.use("/api/blog/author",blogAuthorRoutes);
app.use("/api/blog",blogRoutes);

app.use("/api/blogComment",blogCommentRoutes);

app.use("/api/service",serviceRoutes);
app.use("/api/team",teamRoutes);

app.use("/api/product/category",productCatRoutes);
app.use("/api/product/tag",productTagRoutes);
app.use("/api/product",productRoutes);

app.use("/api/appointment",appointmentRoutes);
app.use("/api/newsletter",newsletterRoutes);
app.use("/api/faq",faqRoutes);

app.use("/api/gallery/category",galleryCatRoutes);
app.use("/api/gallery",galleryRoutes);

app.use("/api/user",userRoutes);
app.use("/api/leadform",leadRoutes);

export default app;