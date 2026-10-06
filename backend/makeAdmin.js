import dns from "node:dns";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "./models/User.js";

// Windows/ISP DNS issue fix
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config();

const email = (process.argv[2] || "").toLowerCase();
if (!email) {
  console.log("Usage: node makeAdmin.js your@email.com");
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
const user = await User.findOneAndUpdate({ email }, { role: "admin" });
console.log(user ? `${email} is now an admin` : `No user found with email ${email}`);
process.exit();