import express from 'express';
import { registerUser } from '../controllers/registration.controller.js';
import { loginUser } from '../controllers/login.controller.js';
import { encryptPan } from '../middleware/encrypt.middleware.js';
import { verifyUser } from '../middleware/user.auth.middleware.js';
import { InvestorInfo } from '../controllers/InvestorInfo.controller.js';
import upload from '../middleware/upload.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/authenticate', loginUser);
router.post('/investorInfo', verifyUser, encryptPan, upload.single('profilePhoto'), InvestorInfo);  /* Testing required */

export default router;