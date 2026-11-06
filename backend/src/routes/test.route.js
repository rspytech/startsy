import express from "express";
// import { verifyUser } from "../middleware/user.auth.middleware";
import getUserFollowers from "../controllers/networkingConnectionsControllers/getUserFollow.js";
import { getOnePosts } from "../controllers/postControllers/getOnePost.js";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { savePost } from "../controllers/postControllers/savePost.js";
import { getSavedPost } from "../controllers/postControllers/getSavedPost.js";
import markAsRead from "../controllers/chatControllers/markAsRead.js";
import addField from "../controllers/adminControllers/addFieldcontroller.js";
import { getAllUsersWithStatus } from "../controllers/networkingConnectionsControllers/getAllUserWithStatus.js";
import { getPortfolioAndCertifications } from "../controllers/profileControllers/getCerticateAndPortfolio.js";
import getInvestorStatus from "../controllers/profileControllers/getInvestorController.js";
import convertInvestorToCommunity from "../controllers/profileControllers/ConvertInvestorToCommunity.js";
import { reportContent } from "../controllers/reportControllers/ReportPostController.js";
import { ratingsController } from "../controllers/feedbackControllers/ratingController.js";

const TestRoute = express.Router();

TestRoute.get("/getUserFollowers/:id", verifyUser, getUserFollowers)
    .get("/getOnePost/:id", verifyUser, getOnePosts)
    .post("/savePost/:saveId/:saveStatus", verifyUser, savePost)
    .get("/getSavedPost", verifyUser, getSavedPost)
    .get("/getInvestorStatus", verifyUser, getInvestorStatus)
    .post("/markAsRead", verifyUser, markAsRead)
    .post("/addField", addField)
    .post("/getAllUsersWithStatus", verifyUser, getAllUsersWithStatus)
    .get("/getPortfolioAndCertifications", verifyUser, getPortfolioAndCertifications)
    .get("/convertInvestorToCommunity", verifyUser, convertInvestorToCommunity)
    .post("/reportContent/:postId", verifyUser, reportContent)
    .post("/ratingsController", verifyUser, ratingsController);

export default TestRoute;
