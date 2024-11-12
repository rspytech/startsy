import express from "express";
import {verifyUser} from "../middleware/user.auth.middleware.js";

import { updateFounderUpvoteCounter } from "../controllers/investorControllers/updateFounderUpvoteCounter.js";
import { addFounderProfile } from "../controllers/investorControllers/addFounderProfile.js";
import { getFounderProfile } from "../controllers/investorControllers/getFounderProfile.js";
import { getInvestorProfileDetails } from "../controllers/investorControllers/getInvestorProfileDetails.js";
import { getRequestedFounders } from "../controllers/investorControllers/getRequestedFounders.js";
import { getInvestorChatUserList } from "../controllers/investorControllers/getInvestorChatsUserList.js";

const router = express.Router();

router.post('/updateFounderUpvoteCounter/:id', verifyUser, updateFounderUpvoteCounter); // id => FounderId   // TESTED
router.post('/addFounderProfile/:id', verifyUser, addFounderProfile);  // id => FounderId     // TESTED
router.get('/recommendation/getFounderProfile', verifyUser, getFounderProfile);
router.get('/getProfilePageDetails', verifyUser, getInvestorProfileDetails);    // TESTED
router.get('/getPendingRequestsByInvestor', verifyUser, getRequestedFounders);  // TESTED
router.get('/getInvestorChatUserList', verifyUser, getInvestorChatUserList);    // last message functionality testing remaining

export default router;