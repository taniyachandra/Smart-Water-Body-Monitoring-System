import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import waterBodyRoutes from "./routes/waterBodies.js";
import reportRoutes from "./routes/reports.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => res.send("SWMS API running"));
app.use("/api/auth", authRoutes);
app.use("/api/water-bodies", waterBodyRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on port ${PORT}`));