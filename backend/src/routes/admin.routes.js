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
import fetchPendingReports from '../controllers/adminControllers/getReportedPost.js';
import { deleteReportedPost } from '../controllers/adminControllers/deleteReportedPostController.js';
import getApkUrlForwebsite from '../controllers/adminControllers/getApkUrlForWebsite.js';
import convertUserDataToExcel from '../controllers/adminControllers/Excel.js';
import getBetaRating from '../controllers/adminControllers/getBetaRating.js';
import getUserCounts from '../controllers/adminControllers/getUserCounts.js';
import ApkFromAssets from '../controllers/adminControllers/ApkFromAssets.js';

const router = express.Router();

router
.post('/registerAdmin', registerAdmin)
.post('/login',  loginAdmin)
.post('/createNewsletter', verifyUser, upload.single('newsletterImage'), createNewsletter)
.get('/getNewsletter/:id', verifyUser, getNewsletter)
.get('/getAllNewletters', verifyUser, getAllNewsletters)
.get("/leaderboard/:category", verifyUser, getLeaderboardNewsletters)
.post("/addApkLink", verifyUser, isAdmin, addApkUrl)
.get("/getInvestor", getInvestor)
.post("/accptOrRejectInvestor/:id/:status", accptOrRejectInvestor)
.get("/reportedPost" , fetchPendingReports)
.post("/deletePost/:id", deleteReportedPost)
.get("/apkForWebsite" , getApkUrlForwebsite)
.get("/convertUserDataToExcel" , convertUserDataToExcel)
.get("/getBetaRating" , getBetaRating)
.get("/getUserCounts" , getUserCounts)
.get("/ApkFromAssets" , ApkFromAssets)


export default router;
