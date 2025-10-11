import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import voiceRoutes from "./routes/voiceRoutes.js";
import ussdRoutes from "./routes/ussdRoutes.js";
import rewardsRoutes from "./routes/rewardsRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/voice", voiceRoutes);
app.use("/api/ussd", ussdRoutes);
app.use("/api/rewards", rewardsRoutes);

app.get("/", (req, res) => res.send("🌿 EcoBarter API is live!"));

// Error Handler
app.use(errorHandler);

export default app;
