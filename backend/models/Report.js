import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    waterBody: { type: String, required: true },
    pollutionType: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "Pending review" },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
