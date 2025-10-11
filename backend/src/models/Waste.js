import mongoose from "mongoose";


const wasteSchema = new mongoose.Schema({
  type: { type: String, required: true },
  weightKg: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Waste", wasteSchema);
