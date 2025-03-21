import { Save } from "../../models/save.model.js";

export const getSavedPost = async (req, res) => {
    try {
        const userId = req.user._id;
        const saves = await Save.find({ userId });
        if (!saves) {
            return res.status(404).json({ message: "Saves not found" });
        }
        res.status(200).json({
            success: true,
            data: saves,
            message: "Saves fetched successfully"
        });

        } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
        }
}