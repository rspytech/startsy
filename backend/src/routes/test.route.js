import express from "express";
// import { verifyUser } from "../middleware/user.auth.middleware";
import getUserFollowers from "../controllers/TestController/getUserFollow.js";
import { getOnePosts } from "../controllers/TestController/getOnePost.js";
const TestRoute = express.Router();

TestRoute
.get("/getUserFollowers/:id", getUserFollowers)
.get("/getOnePost/:id",getOnePosts); 

export default TestRoute;