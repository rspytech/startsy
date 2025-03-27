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
import addApkUrl from '../controllers/adminControllers/Addlink.js';
import getInvestor from '../controllers/adminControllers/GetInvestor.js';
import accptOrRejectInvestor from '../controllers/adminControllers/accptOrRejectInvestor.js';

const router = express.Router();

router.post('/registerAdmin', registerAdmin);
router.post('/login',  loginAdmin);
router.post('/createNewsletter', verifyUser, isAdmin, upload.single('newsletterImage'), createNewsletter);
router.get('/getNewsletter/:id', verifyUser, getNewsletter);
router.get('/getAllNewletters', verifyUser, getAllNewsletters);
router.get("/leaderboard/:category", verifyUser, getLeaderboardNewsletters);
router.post("/addApkLink", verifyUser, isAdmin, addApkUrl);
router.get("/getInvestor", getInvestor);
router.post("/accptOrRejectInvestor/:id/:status", accptOrRejectInvestor);

export default router;
