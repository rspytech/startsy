import { User } from "../../models/user.model.js";

const convertInvestorToCommunity = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findOneAndUpdate(
            { _id: userId },
            {
                role: "CommunityMember",
                investorRejected: false,
                isInvestorVerified: false,
            },
            { new: true }
        );
        const accessToken = user.generateAccessToken();
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export default convertInvestorToCommunity;
