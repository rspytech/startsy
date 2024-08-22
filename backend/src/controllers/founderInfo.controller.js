import { Founder } from "../models/founder.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../../cloudinary.js";

export const FounderInfo = async (req, res) => {

    const {
        contactInfo,
        name,
        previousWorkExperience,
        education,
        skills,
        nameOfStartup,
        goal,
        teamInfo,  // Raw teamInfo data from req.body
        targetAudience,
        timeline,
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

        const currentUserId = req.user._id;
        const currentUser = await User.findById(currentUserId);

        const newFounder = new Founder({
            contactInfo,
            name,
            previousWorkExperience,
            education,
            skills,
            nameOfStartup,
            goal,
            teamInfo,
            hiddenInfo: {
                targetAudience,
                timeline,
                sector,
                fundingStatus,
                stageOfStartup,
                socialProof,
            },
            user_id: req.user._id
        });

        const uploadedPhoto = await uploadOnCloudinary(profilePhoto.path);
        const photoUrl = uploadedPhoto.secure_url;

        currentUser.profilePhoto = photoUrl;
        await currentUser.save();
        await newFounder.save();

        res.status(200).send({
            message: "Founder Details uploaded successfully",
            newFounder,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }
}
