import { Newsletter } from "../../models/newsletter.model.js";

export const getLeaderboardNewsletters = async (req, res) => {
    try {
        const { category } = req.params; // e.g., category=Investor

        if (!["Investor", "Founder", "CommunityMember", "All"].includes(category)) {
            return res.status(400).json({ message: "Invalid category" });
        }

        const newsletters = await Newsletter.find({ leaderboardCategory: category });

        return res.status(200).json({
            message: "Leaderboard newsletters fetched successfully",
            newsletters,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching leaderboard newsletters", error: error.message });
    }
};
