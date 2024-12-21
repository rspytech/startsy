// Investor feed (Home page) upvote button increment functionality.
import { Founder } from "../../models/founder.model.js";
import { Notification } from "../../models/notification.model.js";

export const updateFounderUpvoteCounter = async(req, res) => {
    try {
        const founderId = req.params.id;
        const founder = await Founder.findOneAndUpdate(
            {user_id: founderId},
            {
                $inc: {
                    totalUpvotes: 1,
                    investorUpvotes : 1,
                    upvotesPerDay : 1,
                },
            },{new : true});

        if (!founder) {
            return res.status(404).json({ message: "Founder not found" });
        }
        await Notification.create({
            receivingUserId : founderId, 
            sendingUserId : req.user._id,
            notificationType: "upvoteProfile",
            notificationMessage : "UpVoted your profile.",
        });
        res.json({ message: "Founder upvotes updated", upvotes: { totalUpvotes: founder.totalUpvotes, investorUpvotes: founder.investorUpvotes } });
    }
    catch (error) {
        console.error(`Error updating founder upvote counter: ${error.message}`);
    }
};