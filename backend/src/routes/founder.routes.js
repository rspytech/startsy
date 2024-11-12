import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";

import { acceptRequest } from "../controllers/founderControllers/founderAcceptsRequest.js";
import { rejectRequest } from "../controllers/founderControllers/founderRejectsRequest.js";
import { getFounderChatUserList } from "../controllers/founderControllers/getFounderChatsUserList.js";
import { getFounderNotifications } from "../controllers/founderControllers/getFounderNotifications.js";
import { getFounderProfileDetails } from "../controllers/founderControllers/getFounderProfileDetails.js";

const router = express.Router();

router.post("/acceptRequest/:id", verifyUser, acceptRequest);   // TESTED
router.post("/rejectRequest/:id", verifyUser, rejectRequest);   // TESTED
router.get("/getFounderChatUserList", verifyUser, getFounderChatUserList);    // last message functionality testing remaining
router.get("/getFounderNotifications", verifyUser, getFounderNotifications);  // TESTED
router.get("/getFounderProfileDetails", verifyUser, getFounderProfileDetails);  // TESTED

export default router;