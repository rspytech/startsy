import { uploadOnCloudinary } from "../../cloudinary.js";
import { CommunityMember } from "../models/communityMember.model.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { General } from "../models/general.model.js";

export const CommunityMemeberInfo = async (req, res) => {
    req.body.certification = JSON.parse(req.body.certification)
    req.body.portfolio = JSON.parse(req.body.portfolio)
    req.body.socialProof = JSON.parse(req.body.socialProof)

    try {
        let {
            fullName,
            email,
            country,
            age,
            gender,
            contactInfo,
            communityMemberRole,
            areaOfInterest,
            contentPrefrence,
            tagline,
            skills,
            education,
            certification,
            portfolio,
            socialProof,

        } = req.body;

        const profilePhoto = req.file;

        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);



        if (Array.isArray(socialProof)) {
            socialProof = socialProof.map(item => ({
                name: item.name || "",
                url: item.url || ""
            }));
        } else {
            socialProof = []; // Default to an empty array if input is invalid
        }

        const newCommunityMember = new General({
            fullName,
            email,
            country,
            age,
            gender,
            contactInfo,
            communityMemberRole,
            areaOfInterest,
            contentPrefrence,
            tagline,
            skills,
            education,
            certification,
            portfolio,
            hiddenInfo: {
                socialProof,
            },
            user_id: req.user._id
        });

        let uploadedPhoto;
        if (profilePhoto) {
            try {
                uploadedPhoto = await uploadOnCloudinary(profilePhoto.buffer);
            } catch (err) {
                console.error("Cloudinary Upload Error:", err.message);
                return res.status(400).json({ message: "Error uploading to Cloudinary.", error: err.message });
            }

            if (!uploadedPhoto || !uploadedPhoto.secure_url) {
                return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
            }
            const photoUrl = uploadedPhoto.secure_url;

            currentUser.profilePhoto = photoUrl;
        }
        else {
            currentUser.profilePhoto = process.env.DEFAULT_PROFILE_PHOTO;

        }
        currentUser.email = email;
        currentUser.contactInfo = contactInfo;
        currentUser.roleId = newCommunityMember._id;

        currentUser.isProfileComplete = true;

        const newToken = jwt.sign(
            {
                _id: currentUserId,
                userName: currentUser.userName,
                // email : this.email,
                role: currentUser.role,
                status: true,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        )

        await currentUser.save();
        await newCommunityMember.save();

        res.status(200).json({
            message: "Community Member created successfully",
            newToken,
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            error: error,
            message: "Internal Server Error"
        });
    }
}