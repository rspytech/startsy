import { Community } from "../../models/community.model.js";
import { Post } from "../../models/post.model.js";
import { uploadOnCloudinary } from "../../../cloudinary.js";
import sharp from "sharp";


export const groupPhoto = async (req, res) => {
    try {
        const user_id = req.user?._id; // Ensure user ID exists
        let communityId = req.params.comid;
        console.log(`🔹 Updating group photo for user: ${user_id}`);

        const updateFields = {}; // Store only the fields that need to be updated

        // Check if communityName or communityDescription is provided**
        if (req.body.communityName) {
            updateFields.communityName = req.body.communityName;
        }

        if (req.body.communityDescription) {
            updateFields.communityDescription = req.body.communityDescription;
        }

        //Check if a file (group photo) is uploaded**
        if (req.file && req.file.buffer) {
            console.log("Uploading Buffer to Cloudinary...");
           

            try {
                const uploadResponse = await uploadOnCloudinary(req.file.buffer);
                if (!uploadResponse || !uploadResponse.secure_url) {
                    return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
                }
                updateFields.groupPhoto = uploadResponse.secure_url; // Only update group photo if it's uploaded
            } catch (err) {
                console.error(" Cloudinary Upload Error:", err.message);
                return res.status(500).json({ message: "Error uploading to Cloudinary.", error: err.message });
            }
        }

        //Ensure at least one field is being updated**
        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update." });
        }

        //Find the community where user is an admin**
        const updatedCommunity = await Community.findOneAndUpdate(
            { _id: communityId },  // Find the community by ID
            { $set: updateFields },  // Update only the provided fields
            { new: true }  // Return the updated document
        );

        if (!updatedCommunity) {
            return res.status(404).json({ message: "Community not found or user is not an admin" });
        }

        // Find related posts where this community is referenced**
        const communityPosts = await Post.find({ communityPost: updatedCommunity._id }).populate("communityPost");

        console.log("Group photo updated successfully:", updateFields.groupPhoto || "No photo uploaded");

        return res.status(200).json({
            message: "Community updated successfully",
            updatedCommunity,
            communityPosts,
        });

    } catch (err) {
        console.error(" Profile Update Error:", err.message);
        return res.status(500).json({ message: "Server Error", error: err.message });
    }
};

