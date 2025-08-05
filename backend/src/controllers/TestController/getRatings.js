import { Rating } from "../../models/rating.model.js";
import { User } from "../../models/user.model.js";

export const getRatings = async (req, res) => {
    try {     
        const ratings = await Rating.find()
            .sort({ createdAt: -1 }) // Most recent first
            .populate("userId", "userName profilePhoto"); // Populate basic user details

        if (!ratings.length) {
            return res.status(404).json({ message: "No ratings found" });
        }

        return res.status(200).json({
            message: "Ratings fetched successfully",
            data: ratings,
        });
    } catch (err) {
        console.error("Error fetching ratings:", err);
        return res.status(500).json({ message: "Server error" });
    }
};
