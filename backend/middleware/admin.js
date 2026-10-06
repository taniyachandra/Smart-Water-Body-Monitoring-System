import User from "../models/User.js";

// protect ke baad lagana: req.userId pehle se set hona chahiye
export default async function adminOnly(req, res, next) {
  const user = await User.findById(req.userId).select("role");
  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only." });
  }
  next();
}