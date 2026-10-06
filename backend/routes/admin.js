import { Router } from "express";
import Report from "../models/Report.js";
import WaterBody from "../models/WaterBody.js";
import protect from "../middleware/auth.js";
import adminOnly from "../middleware/admin.js";

const router = Router();

// Is file ke saare routes sirf admin ke liye hain
router.use(protect, adminOnly);

const STATUSES = ["Pending review", "In progress", "Resolved", "Rejected"];

// ---------- Reports ----------
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

// ---------- Water bodies (add / edit / delete) ----------
const TEXT_FIELDS = ["name", "type", "state", "quality"];
const NUMBER_FIELDS = [
  "latitude",
  "longitude",
  "pH",
  "temperature",
  "turbidity",
  "dissolvedOxygen",
  "tds",
];

function cleanWaterBody(body) {
  const data = {};
  TEXT_FIELDS.forEach((f) => (data[f] = String(body[f] ?? "").trim()));
  NUMBER_FIELDS.forEach((f) => (data[f] = Number(body[f])));
  return data;
}

function isValidWaterBody(d) {
  return (
    d.name &&
    d.state &&
    ["River", "Lake", "Reservoir"].includes(d.type) &&
    ["Good", "Moderate", "Poor"].includes(d.quality) &&
    NUMBER_FIELDS.every((f) => Number.isFinite(d[f]))
  );
}

router.post("/water-bodies", async (req, res) => {
  const data = cleanWaterBody(req.body);
  if (!isValidWaterBody(data)) {
    return res.status(400).json({ message: "Please fill all fields correctly." });
  }
  const last = await WaterBody.findOne().sort({ id: -1 }).select("id");
  const created = await WaterBody.create({ id: (last?.id || 0) + 1, ...data });
  res.status(201).json(created);
});

router.put("/water-bodies/:id", async (req, res) => {
  const data = cleanWaterBody(req.body);
  if (!isValidWaterBody(data)) {
    return res.status(400).json({ message: "Please fill all fields correctly." });
  }
  const updated = await WaterBody.findOneAndUpdate(
    { id: Number(req.params.id) },
    data,
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: "Water body not found." });
  res.json(updated);
});

router.delete("/water-bodies/:id", async (req, res) => {
  const deleted = await WaterBody.findOneAndDelete({ id: Number(req.params.id) });
  if (!deleted) return res.status(404).json({ message: "Water body not found." });
  res.json({ message: "Deleted" });
});

export default router;