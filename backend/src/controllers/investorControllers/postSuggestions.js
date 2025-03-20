import { Founder } from "../../models/founder.model.js";
import { Notification } from "../../models/notification.model.js";
import { User } from "../../models/user.model.js";

export const postSuggestions = async(req, res) => {
    try {
        const founderId = req.params.id;

        const founder = await User.findById(founderId);
        const investorUser = await User.findById(req.user._id);
        const {suggestion} = req.body;

        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }

        if(!suggestion){
            return res.status(400).json({ message: "Suggestion is required" });
        }

        await Notification.create({
            receivingUserId : founderId, 
            sendingUserId : req.user._id,
            notificationType: "suggestion",
            notificationMessage : suggestion,
        });

        return res.json({ message: "Investor posted a suggestions", profilePhoto: investorUser.profilePhoto });
    }
    catch (error) {
        console.error(`Error updating founder upvote counter: ${error.message}`);
    }
};