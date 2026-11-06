import { User } from "../models/user.model.js";

export const getInvestorProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).populate({
            path: "roleId",
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User profile retrieved successfully",
            user: user,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving user profile" });
    }
};
