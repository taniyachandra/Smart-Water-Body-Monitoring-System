import mongoose from "mongoose";

const waterBodySchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  type: String,
  state: String,
  latitude: Number,
  longitude: Number,
  quality: String,
  pH: Number,
  temperature: Number,
  turbidity: Number,
  dissolvedOxygen: Number,
  tds: Number,
});

export default mongoose.model("WaterBody", waterBodySchema);
