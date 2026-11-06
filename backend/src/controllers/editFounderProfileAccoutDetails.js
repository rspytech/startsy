//changes here

import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";
import mongoose from "mongoose";
import { Notification } from "../models/notification.model.js";
import { General } from "../models/general.model.js";

export const editFounderAccountProfileDetails = async (req, res) => {
    // console.log(req.body);

    req.body.teamInfo = JSON.parse(req.body.teamInfo);
    req.body.previousWorkExperience = JSON.parse(req.body.previousWorkExperience);
    req.body.socialProof = JSON.parse(req.body.socialProof);
    let {
        country,
        contactInfo,
        fullName,
        previousWorkExperience, // changes
        education,
        skills,
        email,
        nameOfStartup,
        goal,
        description,
        teamInfo, //chnages
        sector,
        fundingStatus,
        stageOfStartup,
        socialProof, //changes
    } = req.body;

    const profilePhoto = req.file;

    // if (!profilePhoto) {
    //     return res.status(400).json({ message: "Please upload a profile photo" });
    // }

    teamInfo = teamInfo.filter((team) => team.tag !== "" && team.name !== "" && team.role !== "");

    try {
        // Update the team info with corresponding user IDs
        const invalidTeamMates = [];
        if (teamInfo && teamInfo.length > 0) {
            for (let i = 0; i < teamInfo.length; i++) {
                const team = teamInfo[i];
                let teamMate;
                if (team.tag.length > 0) {
                    teamMate = await User.findOne({ userName: team.tag });
                    if (!teamMate) {
                        // Add invalid team member to the list
                        invalidTeamMates.push(i);
                    } else {
                        // Replace the tag with the team member's ID
                        teamInfo[i].tag = teamMate._id;
                    }
                }
            }
        }

        if (invalidTeamMates.length > 0) {
            return res.status(555).json({
                message: "Team members were not found in the database. Please correct them.",
                invalidTeamMates,
            });
        }

        // Get the current user
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);

        // If no user is found, return an error
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the existing founder profile
        let founder = await General.findOne({ user_id: currentUserId });

        // Define the fields to be updated
        const fieldsToUpdate = {
            country,
            // age,
            // gender,
            contactInfo,
            fullName,
            previousWorkExperience,
            education,
            skills,
            nameOfStartup,
            goal,
            description,
        };

        // Use a loop to update the fields dynamically
        for (const [key, value] of Object.entries(fieldsToUpdate)) {
            if (value) {
                founder[key] = value; // Update field if it's provided in the request
            }
        }

        // Update teamInfo if provided
        if (teamInfo.length > 0) {
            founder.teamInfo = teamInfo;
        }

        for (let i = 0; i < teamInfo.length; i++) {
            let teamMateTag = teamInfo[i].tag;
            // TeamMateTag is now objectId as it converted now from code above as per the model using  teamInfo[i].tag = teamMate._id;
            let teamMate;
            if (mongoose.Types.ObjectId.isValid(teamMateTag)) {
                teamMate = await User.findById(teamMateTag);
            }
            if (teamMate) {
                await Notification.create({
                    receivingUserId: teamInfo[i].tag,
                    sendingUserId: req.user._id,
                    notificationType: "teammateAdded",
                    notificationMessage: "You have been added to a new startup as a team member",
                });
            }
        }

        // Update hiddenInfo (sector, fundingStatus, stageOfStartup, socialProof)
        const hiddenInfoFields = { sector, fundingStatus, stageOfStartup, socialProof };
        if (!founder.hiddenInfo) {
            founder.hiddenInfo = {}; // Initialize hiddenInfo if it doesn't exist
        }

        for (const [key, value] of Object.entries(hiddenInfoFields)) {
            if (value) {
                founder.hiddenInfo[key] = value; // Update hiddenInfo fields if provided
            }
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

        // Save the profile photo URL
        currentUser.profilePhoto = photoUrl;

        // Save the user and founder documents
        await currentUser.save();
        await founder.save();

        res.status(200).send({
            message: "Founder Details uploaded successfully",
            founder,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error",
        });
    }
};
