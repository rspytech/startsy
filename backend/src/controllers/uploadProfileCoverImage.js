import { uploadOnCloudinary } from "../../cloudinary.js";
import { User } from "../models/user.model.js";

export const uploadProfileCoverImage = async (req, res) => {
    try {
        // Access the uploaded file from Multer
        const coverImage = req.file; // Multer saves the file as `req.file`
        const userId = req.user._id; // Extract the user ID from the authenticated user

        // Check if a file is uploaded
        if (!coverImage || !coverImage.path) {
            return res.status(400).json({ message: "Please select a valid cover image." });
        }

        // Find the user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Upload the file to Cloudinary
        const uploadedCoverImage = await uploadOnCloudinary(coverImage.path);
        if (!uploadedCoverImage || !uploadedCoverImage.secure_url) {
            return res.status(500).json({ message: "Failed to upload image to Cloudinary." });
        }

        // Update the user's banner image URL
        user.bannerImage = uploadedCoverImage.secure_url;
        await user.save();

        // Send a success response
        return res.status(200).json({
            message: "Cover image uploaded successfully.",
            coverImageUrl: user.bannerImage,
        });
    } catch (error) {
        // Handle any unexpected errors
        return res.status(500).json({
            message: "Failed to upload profile cover image.",
            error: error.message,
        });
    }
};
