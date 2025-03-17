// Investor Feed (Profile Page 1)

import { Investor } from "../../models/investor.model.js";

export const getInvestorProfileDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const userProfile = await Investor.findOne({user_id : userId}).populate('user_id');
        if (!userProfile) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({
            message: "User profile details fetched successfully",
            data: userProfile,
        })
    }
    catch (error) {
        return res.status(500).json({ message: "Error while fetching the profile details" });
    }
}