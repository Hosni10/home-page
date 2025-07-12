import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./database/connection.js";
import dotenv from "dotenv";
import headerRoutes from "./routes/headerRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import projectsRoutes from "./routes/projectsRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import footerRoutes from "./routes/footerRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
connectDB();

// Placeholder for routes
app.use("/api/header", headerRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/footer", footerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
