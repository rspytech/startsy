import express from "express";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import { createPost } from "../controllers/postControllers/createPost.controller.js";
import { createJobPost } from "../controllers/postControllers/createJobPost.controller.js";
import { applyJobPost } from "../controllers/postControllers/applyJobPost.js";
import { getPostedJobs } from "../controllers/postControllers/getPostedJobs.js";
import { createCommunityPost } from "../controllers/postControllers/createCommunityPost.controller.js";
import { applyCommunity } from "../controllers/postControllers/applyCommunityPost.js";
import { getCommunityChatList } from "../controllers/postControllers/getCommunityList.js";
import { upvotePost } from "../controllers/postControllers/upvotePost.js";
import { createComment } from "../controllers/postControllers/createComment.controller.js";
import { getComments } from "../controllers/postControllers/getComments.controller.js";
import { getPosts } from "../controllers/postControllers/getPost.controller.js";
import { deletePost } from "../controllers/postControllers/deletePost.controller.js";
import { UsersAppliedForJobs } from "../controllers/postControllers/getAppliedJobApplicants.js";
import { groupPhoto } from "../controllers/postControllers/groupPhoto.js";
import lockCommunity from "../controllers/TestController/lockController.js";
import UpdateCommunity from "../controllers/TestController/updateCommunity.js";
const router = express.Router();

router.post("/createPost/:postType", verifyUser, upload.single("media"), createPost); // TESTED
router.post("/groupPhoto/:comid", verifyUser, upload.single("media"), groupPhoto); // TESTED
router.post("/createJobPost/:postType", verifyUser, createJobPost); // TESTED
router.post("/createCommunityPost/:postType", verifyUser, upload.single("groupPhoto"), createCommunityPost);
router.post("/applyJobPost/:id", verifyUser, applyJobPost); // TESTED
router.get("/getPostedJobs", verifyUser, getPostedJobs); // TESTED
router.post("/applyCommunity/:id", verifyUser, applyCommunity); // TESTED
router.get("/getCommunityChatList", verifyUser, getCommunityChatList); // TESTED
router.post("/upvotePost/:postId/:likeStatus", verifyUser, upvotePost); // TESTED
router.post("/createComment/:id", verifyUser, createComment); // TESTED
router.get("/getComments/:id", verifyUser, getComments); // TESTED
router.post("/deletePost/:id", verifyUser, deletePost);
router.get("/getPosts", verifyUser, getPosts);
router.post("/getAppliedJobApplicants", verifyUser, UsersAppliedForJobs);
router.post("/groupPhoto/:comid", verifyUser, upload.single("media"), groupPhoto);
router.post("/lockCommunity/:id/:status", verifyUser, lockCommunity);
router.post("/updateCommunity/:id", verifyUser, UpdateCommunity);

export default router;
