import express from "express"
import { getUserNotifications } from '../controllers/getUserNotifications.js';
import { getNotificationPost } from '../controllers/getNotificationPost.js';

import { verifyUser } from '../middleware/user.auth.middleware.js';

const router = express.Router();


router.get('/getUserNotifiation', verifyUser, getUserNotifications);
router.get('/getNotificationPost/:id', verifyUser, getNotificationPost);

export default router;
