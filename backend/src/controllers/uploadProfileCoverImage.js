// Not Tested yet

import { uploadOnCloudinary } from "../../cloudinary.js";
import { User } from "../models/user.model.js";

export const uploadProfileCoverImage = async (req, res) => {
    try {
        const coverImage = req.files;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if(!coverImage){
            return res.status(400).json({message: "Please select a cover image."});
        }

        const uploadedCoverImage = await uploadOnCloudinary(coverImage.path);
        const coverImageUrl = uploadedCoverImage.secure_url;

        user.bannerImage = coverImageUrl;
        await user.save();
    }
    catch (error) {
        return res.status(400).json({
            message: "Failed to upload profile cover image.",
            error: error.message,
        })    
    }
}