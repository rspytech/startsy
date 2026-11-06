// URLs under /investor: investor feed, founder recommendations, requests to founders,
// investor chat list and editing the investor profile.

import express from "express";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

import { postSuggestions } from "../controllers/investorControllers/postSuggestions.js";
import { addFounderProfile } from "../controllers/investorControllers/addFounderProfile.js";
import { getFounderProfile } from "../controllers/investorControllers/getFounderProfile.js";
import { getInvestorProfileDetails } from "../controllers/investorControllers/getInvestorProfileDetails.js";
import { getRequestedFounders } from "../controllers/investorControllers/getRequestedFounders.js";
import { getInvestorChatUserList } from "../controllers/investorControllers/getInvestorChatsUserList.js";
import { editInvestorAccountProfileDetails } from "../controllers/profileControllers/editInvestorProfileAccountDetails.js";

const router = express.Router();

router.post("/postSuggestions/:id", verifyUser, postSuggestions); // id => FounderId   // TESTED
router.post("/addFounderProfile/:id", verifyUser, addFounderProfile); // id => FounderId     // TESTED
router.get("/recommendation/getFounderProfile", verifyUser, getFounderProfile);
router.get("/getProfilePageDetails", verifyUser, getInvestorProfileDetails); // TESTED
router.get("/getPendingRequestsByInvestor", verifyUser, getRequestedFounders); // TESTED
router.get("/getInvestorChatUserList", verifyUser, getInvestorChatUserList); // TESTED
router.post(
    "/editInvestorAccountProfileDetails",
    verifyUser,
    upload.single("profilePhoto"),
    editInvestorAccountProfileDetails
); // TESTED

export default router;
