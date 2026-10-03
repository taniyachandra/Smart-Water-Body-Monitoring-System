import { Router } from "express";
import WaterBody from "../models/WaterBody.js";

const router = Router();

router.get("/", async (req, res) => {
  const list = await WaterBody.find().sort({ id: 1 }).select("-_id -__v");
  res.json(list);
});

router.get("/:id", async (req, res) => {
  const item = await WaterBody.findOne({ id: Number(req.params.id) }).select("-_id -__v");
  if (!item) return res.status(404).json({ message: "Water body not found" });
  res.json(item);
});

export default router;