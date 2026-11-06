import { Newsletter } from "../../models/newsletter.model.js";

export const getNewsletter = async (req, res) => {
    try {
        const newsletterId = req.params.id;
        const newsletter = await Newsletter.findById(newsletterId).populate({
            path: "taggedUser",
        });

        if (!newsletter) {
            return res.status(400).json({ message: "Newsletter not found" });
        }

        return res.status(200).json({
            message: "Newsletter fetched successfully",
            data: newsletter,
        });
    } catch (error) {
        return res.status(500).json({ message: `Error while fetching newsletter : ${error}` });
    }
};
