import express from "express";
// import { verifyUser } from "../middleware/user.auth.middleware";
import getUserFollowers from "../controllers/TestController/getUserFollow.js";
import { getOnePosts } from "../controllers/TestController/getOnePost.js";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { savePost } from "../controllers/TestController/savePost.js";
import { getSavedPost } from "../controllers/TestController/getSavePost.js";


const TestRoute = express.Router();

TestRoute
.get("/getUserFollowers/:id",verifyUser, getUserFollowers)
.get("/getOnePost/:id",verifyUser,getOnePosts) 
.post("/savePost/:saveId/:saveStatus",verifyUser,savePost)
.get("/getSavePost/:id",verifyUser,getSavedPost)

export default TestRoute;