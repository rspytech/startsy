import express from "express";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { postReport } from "../controllers/reportControllers/postReport.controller.js";

const router = express.Router();

router.post("/postReport/:id", verifyUser, postReport);

export default router;
