import express from 'express';
import { isAdmin } from '../middleware/adminAuth.middleware.js';
import { verifyUser } from '../middleware/user.auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

import loginAdmin from '../controllers/adminControllers/loginAdmin.js';
import { createNewsletter } from '../controllers/adminControllers/createNewsletter.js';
import { registerAdmin } from '../controllers/adminControllers/addAdmin.js';
import {getNewsletter} from '../controllers/adminControllers/getNewsletter.js';
import { getAllNewsletters } from '../controllers/adminControllers/getAllNewsletters.js';
import { getLeaderboardNewsletters } from '../controllers/adminControllers/getLeaderboard.js';

const router = express.Router();

router.post('/registerAdmin', registerAdmin);
router.post('/login', verifyUser, isAdmin, loginAdmin);
router.post('/createNewsletter', verifyUser, isAdmin, upload.single('newsletterImage'), createNewsletter);
router.get('/getNewsletter/:id', verifyUser, getNewsletter);
router.get('/getAllNewletters', verifyUser, getAllNewsletters);
router.get("/leaderboard/:category", verifyUser, getLeaderboardNewsletters);

export default router;
