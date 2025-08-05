import { Rating } from "../../models/rating.model.js";

export const ratingsController = async (req, res) => {
    try {
        const userId = req.user._id;
        const { ratingStars, ratingText , version} = req.body;
        if (!ratingStars) {
            return res.status(400).json({ message: 'Rating stars are required' });
        }

        const rating = new Rating({
            userId,
            ratingStars,
            ratingText,
            version
        })
        await rating.save();

        console.log(rating);

        return res.status(200).json({message:"Rating saved successfully"})
        


    } catch (err) {
        return res.status(500).json({message:"server error"})
    }
}
