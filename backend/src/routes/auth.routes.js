import express from 'express';
import { registerUser } from '../controllers/registration.controller.js';
import { loginUser } from '../controllers/login.controller.js';
import { encryptPan } from '../middleware/encrypt.middleware.js';
import { verifyUser } from '../middleware/user.auth.middleware.js';
import { InvestorInfo } from '../controllers/InvestorInfo.controller.js';
import upload from '../middleware/upload.middleware.js';
import { FounderInfo } from '../controllers/founderInfo.controller.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/authenticate', loginUser);
router.post('/investorInfo', verifyUser, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'panCardPhoto', maxCount: 1 },
]), encryptPan, InvestorInfo);
router.post('/founderInfo', verifyUser, upload.single('profilePhoto'), FounderInfo);

export default router;
