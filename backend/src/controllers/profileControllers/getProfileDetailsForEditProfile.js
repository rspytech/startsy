import { User } from "../../models/user.model.js";

export const getProfileDetailsForEditProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).select("profilePhoto roleId role").populate({
            path: "roleId",
            select: "-totalUpvotes -upvotesPerDay -chatUsers -posts -requestNotifications -currentUpvoteDate",
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User profile details fetched successfully",
            data: user,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error while getting profile details" });
    }
};
