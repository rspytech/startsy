import { Newsletter } from "../../models/newsletter.model.js";

export const getAllNewsletters = async (req, res) => {
    try {
        const newsletters = await Newsletter.find().populate("taggedUser");
        if (!newsletters) {
            return res.status(404).json({ message: "No newsletters found" });
        }
        return res.status(200).json({
            message: "Newsletters retrieved successfully",
            data: newsletters,
        });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching all newsletters" });
    }
};
