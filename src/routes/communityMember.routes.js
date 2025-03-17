import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";
import upload from '../middleware/upload.middleware.js';
import { editCommunityMemberAccountProfileDetails } from "../controllers/editCommunityMemberAccountProfileDetails.controller.js";
const router = express.Router();

router.post("/editCommunityMemberAccountProfileDetails", verifyUser, upload.single('profilePhoto'), editCommunityMemberAccountProfileDetails);

export default router;