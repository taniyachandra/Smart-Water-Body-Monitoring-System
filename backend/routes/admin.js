import { Router } from "express";
import Report from "../models/Report.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";

const router = Router();

// Is file ke saare routes sirf admin ke liye hain
router.use(protect, adminOnly);

const STATUSES = ["Pending review", "In progress", "Resolved", "Rejected"];

router.get("/reports", async (req, res) => {
  const reports = await Report.find()
    .sort({ createdAt: -1 })
    .populate("user", "name email");
  res.json(reports);
});

router.patch("/reports/:id", async (req, res) => {
  const { status } = req.body;
  if (!STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid status." });
  }
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  ).populate("user", "name email");
  if (!report) return res.status(404).json({ message: "Report not found." });
  res.json(report);
});

export default router;