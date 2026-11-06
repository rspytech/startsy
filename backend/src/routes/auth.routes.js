import express from "express";
import { registerUser } from "../controllers/authenticateUser/registration.controller.js";
import { loginUser } from "../controllers/authenticateUser/login.controller.js";
import { encryptPan } from "../middleware/encrypt.middleware.js";
import { verifyUser } from "../middleware/user.auth.middleware.js";
import { InvestorInfo } from "../controllers/onboardingControllers/InvestorInfo.controller.js";
import upload from "../middleware/upload.middleware.js";
import { FounderInfo } from "../controllers/onboardingControllers/founderInfo.controller.js";
import { FreelancerInfo } from "../controllers/onboardingControllers/freelancerInfo.controller.js";
import { CommunityMemeberInfo } from "../controllers/onboardingControllers/communityMemberInfo.controller.js";
import { DoesUserExists } from "../controllers/authenticateUser/doesUserExists.controller.js";
import { checkUserName } from "../controllers/authenticateUser/checkUserName.js";
import { checkEmail } from "../controllers/authenticateUser/checkEmail.js";
import { checkCurrentPassword } from "../controllers/authenticateUser/checkCurrentPassword.js";
import { changePassword } from "../controllers/authenticateUser/changePassword.controller.js";
import { getUsersProfiles } from "../controllers/profileControllers/getUsersProfile.js";
import { uploadProfileCoverImage } from "../controllers/profileControllers/uploadProfileCoverImage.js";
import { getInvestorProfile } from "../controllers/profileControllers/getInvestorProfile.js";
import { getUserNameSuggestions } from "../controllers/profileControllers/getUserNameSuggestions.js";
import { deleteUnAuthenticatedUser } from "../controllers/authenticateUser/deleteUnAuthenticatedUser.js";
import { deleteUserAccount } from "../controllers/authenticateUser/deleteUserAccount.js";
import { sendOtp } from "../controllers/authenticateUser/sendOtp.js";
import { verifyOtp } from "../controllers/authenticateUser/verifyOtp.js";
import { forgotPassword } from "../controllers/authenticateUser/forgotPassword.js";
import { getProfileDetailsForEditProfile } from "../controllers/profileControllers/getProfileDetailsForEditProfile.js";
import { getCommunityMemberProfile } from "../controllers/profileControllers/getCommunityMemberProfile.js";
import deleteMemberFromCommunity from "../controllers/postControllers/deleteMemberFromCommunity.js";
import PFP from "../controllers/profileControllers/PFP.js";
import getjobs from "../controllers/postControllers/getjobs.js";
import { getProfiledetailForSwitch } from "../controllers/profileControllers/getProfileDetailsForswitch.js";
import updateToJobSeeker from "../controllers/profileControllers/ChangeToJobSeeker.js";
import getApklink from "../controllers/adminControllers/GetApklink.js";
import updateNotificationToken from "../controllers/notificationController/notificationController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/checkusername", checkUserName);
router.post("/checkemail", checkEmail);
router.post("/checkCurrentPassword", verifyUser, checkCurrentPassword);
router.post("/changePassword", verifyUser, changePassword);
router.post("/authenticate", loginUser);

router.post(
    "/investorInfo",
    verifyUser,
    upload.fields([
        { name: "profilePhoto", maxCount: 1 },
        { name: "panCardPhoto", maxCount: 1 },
    ]),
    encryptPan,
    InvestorInfo
);
router.post("/founderInfo", verifyUser, upload.single("profilePhoto"), FounderInfo);
router.post("/freelancerInfo", verifyUser, upload.single("profilePhoto"), FreelancerInfo);
router.post("/communityMemberInfo", verifyUser, upload.single("profilePhoto"), CommunityMemeberInfo);
router.get("/getUsersProfiles/:id", verifyUser, getUsersProfiles);
router.get("/getProfileDetailsForEditProfile", verifyUser, getProfileDetailsForEditProfile);
router.get("/getProfiledetailForSwitch", verifyUser, getProfiledetailForSwitch);
router.post("/doesUserExists", DoesUserExists);
router.post("/uploadCoverImage", verifyUser, upload.single("coverImage"), uploadProfileCoverImage);
router.get("/getInvestorProfile", verifyUser, getInvestorProfile);
router.get("/getUserNameSuggestions/:userName", verifyUser, getUserNameSuggestions);
router.post("/getCommunityMemberProfile", verifyUser, getCommunityMemberProfile);
router.post("/deleteUnauthenticatedUser", verifyUser, deleteUnAuthenticatedUser);
router.post("/deleteMemberFromCommunity", verifyUser, deleteMemberFromCommunity);
router.get("/updateToJobSeeker", verifyUser, updateToJobSeeker);
router.post("/deleteUserAccount/:id", deleteUserAccount);
router.post("/updateNotificationToken", verifyUser, updateNotificationToken); //

router.post("/sendOtp", sendOtp);
router.post("/verifyOtp", verifyOtp);
router.post("/forgotPassword", forgotPassword);
router.get("/PFP", verifyUser, PFP);
router.get("/getJobs", verifyUser, getjobs);
router.get("/getApiLink", verifyUser, getApklink);

export default router;
