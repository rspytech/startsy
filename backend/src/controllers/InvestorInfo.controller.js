import { uploadOnCloudinary } from "../../cloudinary.js";
import { General } from "../models/general.model.js";
import { Investor } from "../models/investor.model.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const InvestorInfo = async (req, res) => {
    try {
        const {
            fullName,
            country,
            age,
            gender,
            contactInfo,
            previousExperience,
            startupStage,
            preferredSector,
            investmentRange,
            linkedInUrl,
            websiteUrl,
            domainEmail,
            investorType,
        } = req.body;

        const profilePhoto = req.files.profilePhoto;
        const pancardPhoto = req.files.panCardPhoto;

        if (
            !contactInfo ||
            !previousExperience ||
            !startupStage ||
            !preferredSector ||
            !investmentRange ||
            !fullName
        ) {
            return res.status(400).json({ message: "Please fill in all the fields" });
        }

        if (!profilePhoto) {
            return res.status(400).json({ message: "Please upload a profile photo" });
        }

        const hashedPanCard = req.hashedPan;
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);
        const encryptedPanCard = req.pan;

        const newInvestor = await General.findOneAndUpdate(
            { _id: req.body.generalModelId },

            {
                $set: {
                    fullName,
                    country,
                    age,
                    gender,
                    contactInfo,
                    previousExperience,
                    panCard: {
                        index: hashedPanCard,
                        pan: encryptedPanCard,
                    },
                    startupStage,
                    preferredSector,
                    investmentRange,
                    linkedInUrl,
                    websiteUrl,
                    domainEmail,
                    investorType,
                    user_id: req.user._id,
                },
            },
            { new: true }
        );

        // const uploadedPhoto = await uploadOnCloudinary(profilePhoto[0].path);
        // const photoUrl = uploadedPhoto.secure_url;

        let uploadedPhoto;
        try {
            uploadedPhoto = await uploadOnCloudinary(profilePhoto[0].buffer);
        } catch (err) {
            console.error("Cloudinary Upload Error:", err.message);
            return res.status(400).json({ message: "Error uploading to Cloudinary.", error: err.message });
        }

        if (!uploadedPhoto || !uploadedPhoto.secure_url) {
            return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
        }
        const photoUrl = uploadedPhoto.secure_url;

        // set profile photo link, email, contactInfo of the current user in the User Model
        currentUser.profilePhoto = photoUrl;
        // currentUser.email = email;
        currentUser.contactInfo = contactInfo;

        currentUser.roleId = newInvestor._id; /* NOTE : Adding the roleId to the base user model */
        currentUser.role = "Investor";

        // const pancardUploadedPhoto = await uploadOnCloudinary(pancardPhoto[0].path);
        // const pancardPhotoUrl = pancardUploadedPhoto.secure_url;

        let pancardUploadedPhoto;
        if (pancardPhoto) {
            try {
                pancardUploadedPhoto = await uploadOnCloudinary(pancardPhoto[0].buffer);
            } catch (err) {
                console.error("Cloudinary Upload Error:", err.message);
                return res
                    .status(400)
                    .json({ message: "Error uploading to Cloudinary.", error: err.message });
            }

            if (!pancardUploadedPhoto || !pancardUploadedPhoto.secure_url) {
                return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
            }
            const pancardPhotoUrl = pancardUploadedPhoto.secure_url;

            newInvestor.panCardPhoto = pancardPhotoUrl;
        }

        currentUser.isProfileComplete = true;

        const newToken = jwt.sign(
            {
                _id: currentUserId,
                userName: currentUser.userName,
                role: "Investor",
                status: true,
                isInvestorVerified: false,
                investorRejected: false,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        );

        await currentUser.save();
        await newInvestor.save();

        console.log("success");

        res.status(200).send({
            message: "Investor Details uploaded successfully",
            newToken,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error while creating account of investor",
            error: error,
        });
    }
};
