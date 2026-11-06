import { Rating } from "../../models/rating.model.js";

async function getBetaRating(req, res) {
    try {
        var data = await Rating.find().populate({
            path: "userId",
            select: "userName role profilePhoto",
            populate: {
                path: "roleId",
                select: "fullName",
            },
        });
        res.status(200).json({ message: data });
    } catch (e) {
        res.status(404).json({ message: e });
    }
}

export default getBetaRating;
