import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";

import sendMessage from "../controllers/chatControllers/sendMessage.controller.js";
import { getMessage } from "../controllers/chatControllers/getMessage.controller.js";

const router = express.Router();

router.post("/sendMessage/:id", verifyUser, sendMessage);
router.get("/getMessage/:id", verifyUser, getMessage);

export default router;