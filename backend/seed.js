import dns from "node:dns";
import dotenv from "dotenv";
import mongoose from "mongoose";
import WaterBody from "./models/WaterBody.js";
import waterBodies from "../frontend/src/data/waterBodies.js";

// Windows/ISP DNS issue fix
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
await WaterBody.deleteMany();
await WaterBody.insertMany(waterBodies);
console.log(`${waterBodies.length} water bodies added`);
process.exit();
