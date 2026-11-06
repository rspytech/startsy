import express from "express";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { getCommunityGroupChatList } from "../controllers/groupChat/getCommunityGroupList.js";
import { getGroupChatMessage } from "../controllers/groupChat/getGroupChatMessage.js";
const router = express.Router();

router.get("/getCommunityGroupChatList", verifyUser, getCommunityGroupChatList);
router.get("/getGroupChatMessage/:id", verifyUser, getGroupChatMessage);

export default router;
