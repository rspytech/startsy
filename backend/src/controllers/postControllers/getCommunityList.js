import { User } from "../../models/user.model.js";

export const getCommunityChatList = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate("communityList");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.communityList || user.communityList.length === 0) {
            return res.status(404).json({ message: "No communities found in user's community list" });
        }

        console.log("User Community List:", user.communityList);

        return res.status(200).json({
            data: user,
            message: "Community chat list fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching community chat list:", error);
        return res
            .status(500)
            .json({ message: "Error while fetching community chat list", error: error.message });
    }
};
