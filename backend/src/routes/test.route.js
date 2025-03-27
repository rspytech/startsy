import express from "express";
// import { verifyUser } from "../middleware/user.auth.middleware";
import getUserFollowers from "../controllers/TestController/getUserFollow.js";
import { getOnePosts } from "../controllers/TestController/getOnePost.js";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { savePost } from "../controllers/TestController/savePost.js";
import { getSavedPost } from "../controllers/TestController/getSavedPost.js";
import markAsRead from "../controllers/TestController/markAsRead.js";
import APKcontroller from "../controllers/TestController/Apkcontroller.js";
import addField from "../controllers/TestController/addFieldcontroller.js";
import { getAllUsersWithStatus } from "../controllers/TestController/getAllUserWithStatus.js";
import { getPortfolioAndCertifications } from "../controllers/TestController/getCerticateAndPortfolio.js";


const TestRoute = express.Router();

TestRoute
.get("/getUserFollowers/:id",verifyUser, getUserFollowers)
.get("/getOnePost/:id",verifyUser,getOnePosts) 
.post("/savePost/:saveId/:saveStatus",verifyUser,savePost)
.get("/getSavedPost",verifyUser,getSavedPost)
.post("/markAsRead",verifyUser , markAsRead)
.post("/addField" , addField)
.get("/getAllUsersWithStatus", verifyUser, getAllUsersWithStatus)
.get("/getPortfolioAndCertifications",verifyUser,getPortfolioAndCertifications)
// .post("/downloadAPK",verifyUser , APKcontroller)

export default TestRoute;