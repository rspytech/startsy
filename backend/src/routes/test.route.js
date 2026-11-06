import express from "express";
// import { verifyUser } from "../middleware/user.auth.middleware";
import getUserFollowers from "../controllers/TestController/getUserFollow.js";
import { getOnePosts } from "../controllers/TestController/getOnePost.js";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { savePost } from "../controllers/TestController/savePost.js";
import { getSavedPost } from "../controllers/TestController/getSavedPost.js";
import markAsRead from "../controllers/TestController/markAsRead.js";
import addField from "../controllers/TestController/addFieldcontroller.js";
import { getAllUsersWithStatus } from "../controllers/TestController/getAllUserWithStatus.js";
import { getPortfolioAndCertifications } from "../controllers/TestController/getCerticateAndPortfolio.js";
import getInvestorStatus from "../controllers/TestController/getInvestorController.js";
import convertInvestorToCommunity from "../controllers/TestController/ConvertInvestorToCommunity.js";
import { reportContent } from "../controllers/TestController/ReportPostController.js";
import { ratingsController } from "../controllers/TestController/ratingController.js";

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
