import { Router } from "express";
import Report from "../models/Report.js";
import protect from "../middleware/auth.js";

const router = Router();

router.post("/", protect, async (req, res) => {
  const { waterBody, pollutionType, location, description } = req.body;
  if (!waterBody || !pollutionType || !location || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const report = await Report.create({
    user: req.userId, waterBody, pollutionType, location, description,
  });
  res.status(201).json(report);
});

router.get("/mine", protect, async (req, res) => {
  const reports = await Report.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(reports);
});

export default router;
