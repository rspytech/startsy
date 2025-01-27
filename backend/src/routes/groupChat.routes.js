import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";
import { getCommunityGroupChatList } from "../controllers/groupChat/getCommunityGroupList.js";
const router = express.Router();

router.get("/getCommunityGroupChatList", verifyUser, getCommunityGroupChatList);

export default router;