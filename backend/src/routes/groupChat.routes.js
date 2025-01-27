import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";
import { getCommunnityGroupChatList } from "../controllers/groupChat/getCommunityGroupList.js";
const router = express.Router();

router.get("/getCommunnityGroupChatList", verifyUser, getCommunnityGroupChatList);

export default router;