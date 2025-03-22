import express from "express";
// import { verifyUser } from "../middleware/user.auth.middleware";
import getUserFollowers from "../controllers/TestController/getUserFollow.js";
import { getOnePosts } from "../controllers/TestController/getOnePost.js";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { savePost } from "../controllers/TestController/savePost.js";
import { getSavedPost } from "../controllers/TestController/getSavedPost.js";
import markAsRead from "../controllers/TestController/markAsRead.js";
import APKcontroller from "../controllers/TestController/Apkcontroller.js";


const TestRoute = express.Router();

TestRoute
.get("/getUserFollowers/:id",verifyUser, getUserFollowers)
.get("/getOnePost/:id",verifyUser,getOnePosts) 
.post("/savePost/:saveId/:saveStatus",verifyUser,savePost)
.get("/getSavedPost",verifyUser,getSavedPost)
.post("/markAsRead",verifyUser , markAsRead)
// .post("/downloadAPK",verifyUser , APKcontroller)

export default TestRoute;