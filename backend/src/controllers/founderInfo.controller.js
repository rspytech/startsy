import { Founder } from "../models/founder.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";
import { Notification } from "../models/notification.model.js";
import Recommendation from "../models/recommendation.model.js";
import RecommendationBasic from "../algorithms/recommendation.js";
import mappings from "../config/startupPrefrencesMapping.js"; // Assuming the mappings are available in this config file
import mongoose from "mongoose";
// Initialize RecommendationBasic with mappings
const recommender = new RecommendationBasic(mappings.stage, mappings.sector, mappings.location, mappings.fundingRange);

export const FounderInfo = async (req, res) => {

    req.body.teamInfo = JSON.parse(req.body.teamInfo)
    req.body.previousWorkExperience = JSON.parse(req.body.previousWorkExperience)
    req.body.socialProof = JSON.parse(req.body.socialProof)

    let {
        email,
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
    console.log(req.body);
    const profilePhoto = req.file;

    if (!profilePhoto) {
        return res.status(400).json({ message: "Please upload a profile photo" });
    }
    teamInfo = teamInfo.filter((team) => team.tag !== "" && team.name !== "" && team.role !== "")

    console.log("affafiajfiajfoajfofaofoadfkfake", teamInfo.length);

    try {
        // 1. Process the team info
        const invalidTeamMates = [];
        if(teamInfo && teamInfo.length > 0){
            for (let i = 0; i < teamInfo.length; i++) {
                const team = teamInfo[i];
                let teamMate;
                if(team.tag.length > 0){
                    teamMate = await User.findOne({ userName: team.tag });
                    if (!teamMate) {
                        // Add invalid team member to the list
                        invalidTeamMates.push(i);
                    }
                    else {
                        // Replace the tag with the team member's ID
                        teamInfo[i].tag = teamMate._id;
                    }
                }
            }
        }
        

        // If there are invalid team members, send a response but don't stop execution
        if (invalidTeamMates.length > 0) {
            return res.status(555).json({
                message: "Team members were not found in the database. Please correct them.",
                invalidTeamMates,
            });
        }

        // 2. Find the current user
        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);

        // 3. Create a new Founder profile
        const newFounder = new Founder({
            email,
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
            hiddenInfo: {
                sector,
                fundingStatus,
                stageOfStartup,
                socialProof,
            },
            user_id: req.user._id
        });
        
        for(let i = 0; i < teamInfo.length; i++){
            let teamMateTag = teamInfo[i].tag; 
            // TeamMateTag is now objectId as it converted now from code above as per the model using  teamInfo[i].tag = teamMate._id;
            let teamMate;
            if(mongoose.Types.ObjectId.isValid(teamMateTag)) {
              teamMate = await User.findById(teamMateTag);  
            }   
            if(teamMate){
                await Notification.create({
                    receivingUserId : teamInfo[i].tag,
                    sendingUserId : req.user._id,
                    notificationType : "teammateAdded",
                    notificationMessage : "You have been added to a new startup as a team member",
                });
            }
            
        }

        // 4. Update current user details
        if (email) {
            currentUser.email = email;
        }

        if (contactInfo) {
            currentUser.contactInfo = contactInfo;
        }

        // 5. Upload profile photo to Cloudinary
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
        currentUser.profilePhoto = photoUrl;
        currentUser.roleId = newFounder._id;

        // 6. Generate Recommendation ID for the founder based on preferences
        const recommendationPreferences = {
            stage: stageOfStartup,
            sector,
            location: country,
            fundingRange: fundingStatus
        };

        const recommendationIds = recommender.recommendation_id(recommendationPreferences);

        // 7. Assign the first recommendation ID to the founder
        newFounder.recommendationId = recommendationIds[0];

        currentUser.isProfileComplete = true;
        // 8. Save the current user and new founder profile
        await currentUser.save();
        await newFounder.save();

        // 9. Insert founder's ID into the Recommendation schema
        const recommendation = await Recommendation.findOneAndUpdate(
            { recommendationId: recommendationIds[0] }, // Find or create the recommendation ID
            {
                $push: { matchingFounders: newFounder._id }, // Push the founder's user ID into matchingFounders array
            },
            { upsert: true, new: true } // Create a new record if it doesn't exist
        );

        res.status(200).send({
            message: "Founder Details uploaded successfully",
            newFounder,
        });
        console.log("founder succesfuly created ");
        

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}