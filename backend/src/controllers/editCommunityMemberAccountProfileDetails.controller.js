import { User } from "../models/user.model.js";
import { CommunityMember } from "../models/communityMember.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";
import { General } from "../models/general.model.js";

export const editCommunityMemberAccountProfileDetails = async (req, res) => {
    try {
        // Parse JSON fields if they are sent as strings
        if (req.body.certification) {
            req.body.certification = JSON.parse(req.body.certification);
        }
        if (req.body.portfolio) {
            req.body.portfolio = JSON.parse(req.body.portfolio);
        }
        if (req.body.socialProof) {
            req.body.socialProof = JSON.parse(req.body.socialProof);
        }
        console.log(req.body.socialProof);
        

        const {
            fullName,
            country,
            contactInfo,
            communityMemberRole,
            areaOfInterest,
            contentPrefrence,
            tagline,
            skills,
            education,
            certification,
            portfolio,
            socialProof
        } = req.body;

        const profilePhoto = req.file;

        // if (!profilePhoto) {
        //     return res.status(400).json({ message: "Please upload a profile photo" });
        // }

        // Get the current user
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the existing community member profile
        let communityMember = await General.findOne({ user_id: currentUserId });

        if (!communityMember) {
            return res.status(404).json({ message: "Community Member profile not found" });
        }

        // Define the fields to be updated
        const fieldsToUpdate = {
            fullName,
            country,
            contactInfo,
            communityMemberRole,
            areaOfInterest,
            contentPrefrence,
            tagline,
            skills,
            education,
            socialProof,
            
        };

        // Update the fields dynamically
        for (const [key, value] of Object.entries(fieldsToUpdate)) {
            // console.log(key , value , "okkkkkkkkkkkkk");
            
            if(key == "socialProof") {
                communityMember["hiddenInfo"].socialProof =  value
            }
            else {
                communityMember[key] = value;
            }
        }

        // Update certification if provided
        if (Array.isArray(certification) && certification.length > 0) {
            communityMember.certification = certification;
        }

        // Update portfolio if provided
        if (Array.isArray(portfolio) && portfolio.length > 0) {
            communityMember.portfolio = portfolio;
        }

        // Handle profile photo upload
        let uploadedPhoto;
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

        // Save the profile photo URL in the user document
        currentUser.profilePhoto = photoUrl;

        // Save the updated user and community member documents
        await currentUser.save();
        await communityMember.save();

        res.status(200).send({
            message: "Community Member profile updated successfully",
            communityMember,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};
