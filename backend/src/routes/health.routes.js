// URLs under /health: a simple "are you alive?" check used to keep the Render server awake.

import express from "express";
import { pingHealth } from "../controllers/health/pingHealth.js"; // Assuming the controller is in controllers folder

const router = express.Router();

// Define the ping route
router.get("/pingHealth", pingHealth);

export default router;
