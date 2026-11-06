import { User } from "../models/user.model.js";

export const getProfiledetailForSwitch = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId).populate({
            path: "roleId",
            select: "fullName email country contactInfo age gender ",
        });
        // console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User profile details fetched successfully",
            data: user.roleId,
            profilePhoto: user.profilePhoto,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error while getting profile details" });
    }
};
