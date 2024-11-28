import { Founder } from "../models/founder.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";

export const editFounderAccountProfileDetails = async (req, res) => {
    const {
        country,
        age,
        gender,
        contactInfo,
        fullName,
        previousWorkExperience,
        education,
        skills,
        nameOfStartup,
        goal,
        description,
        teamInfo,
        sector,
        fundingStatus,
        stageOfStartup,
        socialProof
    } = req.body;

    const profilePhoto = req.file;

    if (!profilePhoto) {
        return res.status(400).json({ message: "Please upload a profile photo" });
    }

    try {
        // Update the team info with corresponding user IDs
        let i = 0;
        for (const team of teamInfo) {
            let teamMate = await User.findOne({ userName: team.tag });

            if (!teamMate) {
                return res.status(404).send({
                    message: `Team Member with the username ${team.tag} does not exist`,
                });
            }

            teamInfo[i].tag = teamMate._id;
            i += 1;
        }

        // Get the current user
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);

        // If no user is found, return an error
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the existing founder profile
        let founder = await Founder.findOne({ user_id: currentUserId });

        // Define the fields to be updated
        const fieldsToUpdate = {
            country,
            age,
            gender,
            contactInfo,
            fullName,
            previousWorkExperience,
            education,
            skills,
            nameOfStartup,
            goal,
            description
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
        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
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

    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
};