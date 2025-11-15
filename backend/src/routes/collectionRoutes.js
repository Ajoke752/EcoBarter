import express from "express";
import WasteReport from "../models/WasteReport.js";
import Reward from "../models/Reward.js";
import User from "../models/User.js";

const router = express.Router();

// GET /api/collections/pending
// Fetches all reports with status "pending" and populates farmer info
router.get("/pending", async (req, res) => {
  try {
    const reports = await WasteReport.find({ status: "pending" })
      .sort({ created_at: -1 })
      .lean(); // Use .lean() for plain JS objects

    // We need to fetch farmer details for each report
    const reportsWithFarmer = await Promise.all(
      reports.map(async (report) => {
        // Find the farmer associated with the report
        const farmer = await User.findById(report.farmer_id).select(
          "fullName phone"
        );
        return {
          ...report,
          wasteType: report.waste_type, // Ensure consistency
          createdAt: report.created_at, // Ensure consistency
          farmer: {
            fullName: farmer ? farmer.fullName : "Unknown Farmer",
            phone: farmer ? farmer.phone : "N/A", // Add phone if it exists
          },
        };
      })
    );

    res.json(reportsWithFarmer);
  } catch (error) {
    console.error("Error fetching pending reports:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/collections/start/:id
// Marks a waste report as "in_progress"
router.post("/start/:id", async (req, res) => {
  try {
    const report = await WasteReport.findByIdAndUpdate(
      req.params.id,
      { status: "in_progress" },
      { new: true }
    );
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    console.error("Error starting collection:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// POST /api/collections/complete/:id
// Marks a report as "completed", assigns agent, and creates rewards
router.post("/complete/:id", async (req, res) => {
  try {
    const { agentId } = req.body;
    if (!agentId)
      return res.status(400).json({ message: "Agent ID is required" });

    const report = await WasteReport.findByIdAndUpdate(
      req.params.id,
      { status: "completed", agent_id: agentId },
      { new: true }
    );

    if (!report) return res.status(404).json({ message: "Report not found" });

    // --- Create Reward ---
    // (Based on the logic from the frontend toast message)
    const treeSeedlings = 1; // Example: 1 seedling per completed report
    const compostCredits = (report.quantity || 1) * 5; // Example: 5 credits per item

    const newReward = await Reward.create({
      farmer_id: report.farmer_id,
      treeSeedlings,
      compostCredits,
    });
    // --- End Reward ---

    res.json({
      message: "Collection completed!",
      treeSeedlings: newReward.treeSeedlings,
      compostCredits: newReward.compostCredits,
    });
  } catch (error) {
    console.error("Error completing collection:", error.message);
    res.status(500).json({ message: error.message });
  }
});

// GET /api/collections/agent/:id
// Gets completed collections for a specific agent
router.get("/agent/:id", async (req, res) => {
  try {
    const collections = await WasteReport.find({
      agent_id: req.params.id,
      status: "completed",
    }).sort({ created_at: -1 });
    res.json(collections);
  } catch (error) {
    console.error("Error fetching agent collections:", error.message);
    res.status(500).json({ message: error.message });
  }
});

export default router;
