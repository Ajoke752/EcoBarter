import mongoose from "mongoose";

const rewardSchema = new mongoose.Schema({
  farmer_id: String,
  treeSeedlings: Number,
  compostCredits: Number,
});

export default mongoose.model("Reward", rewardSchema);
