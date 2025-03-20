import { Community } from "../../models/community.model.js";
import { Post } from "../../models/post.model.js";
import { uploadOnCloudinary } from "../../../cloudinary.js";

export const groupPhoto = async (req, res) => {
    try {
        const user_id = req.user?._id; // Ensure user ID exists
        let communityId = req.params.comid;
        console.log(`🔹 Updating group photo for user: ${user_id}`);

        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        console.log("📤 Uploading Buffer to Cloudinary...");
        let uploadResponse;
        try {
            uploadResponse = await uploadOnCloudinary(req.file.buffer);
            if (!uploadResponse || !uploadResponse.secure_url) {
                return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
            }
        } catch (err) {
            console.error("❌ Cloudinary Upload Error:", err.message);
            return res.status(500).json({ message: "Error uploading to Cloudinary.", error: err.message });
        }

        const groupPhotoUrl = uploadResponse.secure_url;
        const groupPhotoType = uploadResponse.resource_type;

        //Find the community where user is an admin**
        const updatedCommunity = await Community.findOneAndUpdate(
            {_id : communityId },  // Ensure user is an admin
            { groupPhoto: groupPhotoUrl }, 
            { new: true }  // Return the updated document
        );

        if (!updatedCommunity) {
            return res.status(404).json({ message: "Community not found or user is not an admin" });
        }

        //Find related posts where this community is referenced
        const communityPosts = await Post.find({ communityPost: updatedCommunity._id }).populate("communityPost");

        console.log("✅ Group photo updated successfully:", groupPhotoUrl);

        return res.status(200).json({
            message: "Group photo uploaded successfully",
            groupPhotoUrl,
            groupPhotoType,
            updatedCommunity,
            communityPosts
        });

    } catch (err) {
        console.error("❌ Profile Update Error:", err.message);
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};


