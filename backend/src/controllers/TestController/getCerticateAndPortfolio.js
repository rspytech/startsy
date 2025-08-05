import { General } from "../../models/general.model.js";

export const getPortfolioAndCertifications = async (req, res) => {
    try {
        const userId = req.user._id;

        const userProfile = await General.findOne({ user_id: userId })
            .select("portfolio certification")
            .lean(); 

        if (!userProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        return res.status(200).json({
            success: true,
            portfolio: userProfile.portfolio || [],
            certification: userProfile.certification || [],
            message: "Portfolio and Certifications fetched successfully"
        });

    } catch (error) {
        console.error("Error fetching portfolio and certifications:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};