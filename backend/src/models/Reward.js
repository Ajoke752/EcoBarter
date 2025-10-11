import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pointsEarned: Number,
  rewardType: String, // e.g., "Tree Seedling", "Compost"
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Reward", rewardSchema);
