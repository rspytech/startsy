import express from "express";
import { followUser } from "../controllers/networkingConnectionsControllers/follow.controller.js";
import { unfollowUser } from "../controllers/networkingConnectionsControllers/unfollow.controller.js";
import { verifyUser } from "../middleware/user.auth.middleware.js";

const router = express.Router();

router.post("/followUser/:id", verifyUser, followUser);
router.post("/unfollowUser/:id", verifyUser, unfollowUser);

export default router;
