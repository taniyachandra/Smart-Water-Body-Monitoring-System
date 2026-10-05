import { Router } from "express";
import Report from "../models/Report.js";
import protect from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = Router();

// Photo upload ke errors ko saaf message me badalna
const handleUpload = (req, res, next) => {
  upload.single("photo")(req, res, (err) => {
    if (err) {
      const message =
        err.code === "LIMIT_FILE_SIZE" ? "Photo must be under 5 MB." : err.message;
      return res.status(400).json({ message });
    }
    next();
  });
};

router.post("/", protect, handleUpload, async (req, res) => {
  const { waterBody, pollutionType, location, description } = req.body;
  if (!waterBody || !pollutionType || !location || !description) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const report = await Report.create({
    user: req.userId,
    waterBody,
    pollutionType,
    location,
    description,
    photo: req.file ? `/uploads/${req.file.filename}` : "",
  });
  res.status(201).json(report);
});

router.get("/mine", protect, async (req, res) => {
  const reports = await Report.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(reports);
});

export default router;