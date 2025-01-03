import { Founder } from "../models/founder.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";
import Recommendation from "../models/recommendation.model.js";
import RecommendationBasic from "../algorithms/recommendation.js";
import mappings from "../config/startupPrefrencesMapping.js"; // Assuming the mappings are available in this config file

// Initialize RecommendationBasic with mappings
const recommender = new RecommendationBasic(mappings.stage, mappings.sector, mappings.location, mappings.fundingRange);

export const FounderInfo = async (req, res) => {

    req.body.teamInfo = JSON.parse(req.body.teamInfo)
    req.body.previousWorkExperience = JSON.parse(req.body.previousWorkExperience)
    req.body.socialProof = JSON.parse(req.body.socialProof)

    const {
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

    try {
        // 1. Process the team info
        let i = 0;
        for (const team of teamInfo) {
            let teamMate = await User.findOne({ userName: team.tag });

            if (!teamMate) {
                res.status(404).send({
                    message: `Team Member with the username ${team.tag} does not exist`,
                });
            }

            teamInfo[i].tag = teamMate._id;
            i += 1;
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

        // 4. Update current user details
        if (email) {
            currentUser.email = email;
        }

        if (contactInfo) {
            currentUser.contactInfo = contactInfo;
        }

        // 5. Upload profile photo to Cloudinary
        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
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