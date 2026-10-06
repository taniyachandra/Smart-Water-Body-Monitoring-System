import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

const router = Router();

const makeToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const publicUser = (user) => ({
  name: user.name,
  email: user.email,
  role: user.role,
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || password.length < 6) {
    return res.status(400).json({ message: "Fill all fields (password min 6 characters)." });
  }
  if (await User.findOne({ email: email.toLowerCase() })) {
    return res.status(409).json({ message: "An account with this email already exists." });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  res.status(201).json({
    token: makeToken(user._id),
    user: publicUser(user),
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || "").toLowerCase() });
  if (!user || !(await bcrypt.compare(password || "", user.password))) {
    return res.status(401).json({ message: "Incorrect email or password." });
  }
  res.json({
    token: makeToken(user._id),
    user: publicUser(user),
  });
});

const hashToken = (token) =>
  crypto.createHash("sha256").update(token).digest("hex");

// Step 1: user email deta hai, reset link banta hai
router.post("/forgot-password", async (req, res) => {
  const email = (req.body.email || "").toLowerCase();
  const user = await User.findOne({ email });

  if (user) {
    const token = crypto.randomBytes(32).toString("hex");
    user.resetTokenHash = hashToken(token);
    user.resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 ghanta
    await user.save();

    const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
    await sendEmail({
      to: user.email,
      subject: "Reset your SWMS password",
      text: `Hi ${user.name},\n\nReset your password using this link (valid for 1 hour):\n${clientUrl}/reset-password/${token}\n\nIf you did not request this, you can ignore this email.`,
    });
  }

  // Hamesha same jawab, taaki koi email check na kar sake
  res.json({ message: "If that email is registered, a reset link has been sent." });
});

// Step 2: link se naya password set hota hai
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters." });
  }

  const user = await User.findOne({
    resetTokenHash: hashToken(req.params.token),
    resetTokenExpires: { $gt: new Date() },
  });
  if (!user) {
    return res.status(400).json({ message: "This reset link is invalid or has expired." });
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetTokenHash = "";
  user.resetTokenExpires = undefined;
  await user.save();

  res.json({ message: "Password updated. You can log in now." });
});

export default router;