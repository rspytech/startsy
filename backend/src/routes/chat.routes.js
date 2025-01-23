import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";

import sendMessage from "../controllers/chatControllers/sendMessage.controller.js";
import { getMessage } from "../controllers/chatControllers/getMessage.controller.js";
import { getSocketInstance } from "../socket/socketIo.js";
import { addToChatDirectly } from "../controllers/chatControllers/addToChatListDirectly.js";

const router = express.Router();

router.post("/sendMessage/:id", verifyUser, (req, res) => {
    const io = getSocketInstance();
    sendMessage(req, res, io);
});
router.get("/getMessage/:chatType/:id", verifyUser, getMessage);
router.post("/addToChatDirectly/:id", verifyUser, addToChatDirectly);

export default router;