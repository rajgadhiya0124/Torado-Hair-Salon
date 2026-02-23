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
import productReviewRoutes from "./router/product.reivew.router.js"
import orderRoutes from "./router/order.router.js";
import privacyRoutes from "./router/privacy.router.js"
import termsRoutes from "./router/terms.router.js"
import homeHeroRoutes from "./router/home.hero.router.js"
import homeAboutRoutes from "./router/home.aboutus.router.js"
import homePartnerRoutes from "./router/home.partner.router.js"
import BestServiceRoutes from "./router/home.bestservice.router.js"
import dashboardRoutes from "./router/dashboard.router.js"
import notificationRoutes from "./router/notification.router.js"
import wishlistRoutes from "./router/wishlist.router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/home/hero",homeHeroRoutes);
app.use("/api/home/about",homeAboutRoutes);
app.use("/api/home/partner",homePartnerRoutes);
app.use("/api/home/bestpriceService",BestServiceRoutes);

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notification", notificationRoutes);

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
app.use("/api/product/review",productReviewRoutes);

app.use("/api/order",orderRoutes);

app.use("/api/appointment",appointmentRoutes);
app.use("/api/newsletter",newsletterRoutes);
app.use("/api/faq",faqRoutes);
app.use("/api/privacy",privacyRoutes);
app.use("/api/terms",termsRoutes);
app.use("/api/wishlist",wishlistRoutes);

app.use("/api/gallery/category",galleryCatRoutes);
app.use("/api/gallery",galleryRoutes);

app.use("/api/user",userRoutes);
app.use("/api/leadform",leadRoutes);

export default app;