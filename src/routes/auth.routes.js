import express from 'express';
import { registerUser } from '../controllers/registration.controller.js';
import { loginUser } from '../controllers/login.controller.js';
import { encryptPan } from '../middleware/encrypt.middleware.js';
import { verifyUser } from '../middleware/user.auth.middleware.js';
import { InvestorInfo } from '../controllers/InvestorInfo.controller.js';
import upload from '../middleware/upload.middleware.js';
import { FounderInfo } from '../controllers/founderInfo.controller.js';
import { FreelancerInfo } from '../controllers/freelancerInfo.controller.js';
import { CommunityMemeberInfo } from '../controllers/communityMemberInfo.controller.js';
import { DoesUserExists } from '../controllers/doesUserExists.controller.js';
import { checkUserName } from '../controllers/authenticateUser/checkUserName.js';
import { checkEmail } from '../controllers/authenticateUser/checkEmail.js';
import { checkCurrentPassword } from '../controllers/authenticateUser/checkCurrentPassword.js';
import { changePassword } from '../controllers/changePassword.controller.js';
import { getUsersProfiles } from '../controllers/getUsersProfile.js';
import { uploadProfileCoverImage } from '../controllers/uploadProfileCoverImage.js';
import { getInvestorProfile } from '../controllers/getInvestorProfile.js';
import { getUserNameSuggestions } from '../controllers/getUserNameSuggestions.js';
import { deleteUnAuthenticatedUser } from '../controllers/authenticateUser/deleteUnAuthenticatedUser.js';
import { deleteUserAccount } from '../controllers/authenticateUser/deleteUserAccount.js';
import { sendOtp } from '../controllers/authenticateUser/sendOtp.js';
import { verifyOtp } from '../controllers/authenticateUser/verifyOtp.js';
import { forgotPassword } from '../controllers/authenticateUser/forgotPassword.js';
import { getProfileDetailsForEditProfile } from '../controllers/getProfileDetailsForEditProfile.js';
import { getCommunityMemberProfile } from '../controllers/getCommunityMemberProfile.js';
import deleteMemberFromCommunity from '../controllers/deleteMemberFromCommunity.js';
import PFP from '../controllers/PFP.js';
import getjobs from '../controllers/getjobs.js';
import { getProfiledetailForSwitch } from '../controllers/getProfileDetailsForswitch.js';
import updateToJobSeeker from '../controllers/CustomController/ChangeToJobSeeker.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/checkusername', checkUserName);
router.post('/checkemail', checkEmail);
router.post('/checkCurrentPassword', verifyUser, checkCurrentPassword);
router.post('/changePassword', verifyUser, changePassword);
router.post('/authenticate', loginUser);

router.post('/investorInfo', verifyUser, upload.fields([
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'panCardPhoto', maxCount: 1 },
]), encryptPan, InvestorInfo);
router.post('/founderInfo', verifyUser, upload.single('profilePhoto'), FounderInfo);
router.post('/freelancerInfo', verifyUser, upload.single('profilePhoto'), FreelancerInfo);
router.post('/communityMemberInfo', verifyUser, upload.single('profilePhoto'), CommunityMemeberInfo);
router.get('/getUsersProfiles/:id', verifyUser, getUsersProfiles);
router.get('/getProfileDetailsForEditProfile', verifyUser, getProfileDetailsForEditProfile);
router.get('/getProfiledetailForSwitch', verifyUser, getProfiledetailForSwitch);
router.post('/doesUserExists', DoesUserExists);
router.post('/uploadCoverImage', verifyUser, upload.single('coverImage'), uploadProfileCoverImage);
router.get('/getInvestorProfile', verifyUser, getInvestorProfile);
router.get('/getUserNameSuggestions/:userName', verifyUser, getUserNameSuggestions);
router.post('/getCommunityMemberProfile', verifyUser, getCommunityMemberProfile);
router.post('/deleteUnauthenticatedUser', verifyUser, deleteUnAuthenticatedUser);
router.post('/deleteMemberFromCommunity', verifyUser, deleteMemberFromCommunity );
router.get('/updateToJobSeeker', verifyUser, updateToJobSeeker );
router.post('/deleteUserAccount/:id', deleteUserAccount);

router.post('/sendOtp', sendOtp);
router.post('/verifyOtp', verifyOtp);
router.post('/forgotPassword', forgotPassword);
router.get('/PFP', verifyUser , PFP);
router.get('/getJobs', verifyUser , getjobs);

export default router;
