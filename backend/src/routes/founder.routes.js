import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";
import upload from '../middleware/upload.middleware.js';
import { acceptRequest } from "../controllers/founderControllers/founderAcceptsRequest.js";
import { rejectRequest } from "../controllers/founderControllers/founderRejectsRequest.js";
import { getFounderChatUserList } from "../controllers/founderControllers/getFounderChatsUserList.js";
import { getFounderNotifications } from "../controllers/founderControllers/getFounderNotifications.js";
import { getFounderProfileDetails } from "../controllers/founderControllers/getFounderProfileDetails.js";
import { editFounderAccountProfileDetails } from "../controllers/editFounderProfileAccoutDetails.js";

const router = express.Router();

router.post("/acceptRequest/:id", verifyUser, acceptRequest);   // TESTED
router.post("/rejectRequest/:id", verifyUser, rejectRequest);   // TESTED
router.get("/getFounderChatUserList", verifyUser, getFounderChatUserList);    // TESTED
router.get("/getFounderNotifications", verifyUser, getFounderNotifications);  // TESTED
router.get("/getFounderProfileDetails", verifyUser, getFounderProfileDetails);  // TESTED
router.post("/editFounderAccountProfileDetails", verifyUser, upload.single('profilePhoto'), editFounderAccountProfileDetails);  // TESTED

export default router;