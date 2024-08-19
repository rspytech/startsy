import { Founder } from "../models/founder.model.js";
import { User } from "../models/user.model.js";


export const FounderInfo = async (req, res) => {

    const {
        contactInfo,
        name,
        previousWorkExperience,
        education,
        skills,
        nameOfStartup,
        goal,
        teamInfo,
        targetAudience,
        timeline,
        sector,
        fundingStatus,
        stageOfStartup,
        socialProof
    } = req.body;

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

        console.log(req.user._id)
        
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
        })

        await newFounder.save();

        res.status(200).send({
            message: "Founder Details uploaded successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        });
    }

}