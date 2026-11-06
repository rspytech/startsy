import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../../cloudinary.js";
import { Post } from "../../models/post.model.js";
import sharp from "sharp";

const createPost = async (req, res) => {
    try {
        const type = req.params.postType;
        const { caption, content, aspectRatio, isPrivate } = req.body;
        console.log(aspectRatio);
        const user_id = req.user._id;
        console.log(req.body);

        let mediaUrl = null;
        let mediaType = null;

        if (type === "photo" || type === "video") {
            const postCount = await Post.countDocuments({ user_id, type: "photo" });
            if (postCount >= 20) {
                return res.status(412).json({
                    success: false,
                    message: "Post limit exceeded. You can create up to 10 posts only",
                });
            }
            // const localFilePath = req.file?.path;
            // console.log(localFilePath);
            // if (localFilePath) {
            //     const uploadResponse = await uploadOnCloudinary(localFilePath);
            //     if (uploadResponse) {
            //         mediaUrl = uploadResponse.secure_url;
            //         mediaType = uploadResponse.resource_type;
            //     }
            // }
            let localFilePath = req.file?.buffer;
            console.log(localFilePath);

            var size = req.file.size / 1024 / 1024;
            console.log(size, "img size");
            if (localFilePath) {
                if (size > 1) {
                    var rec1 = sharp(localFilePath);
                    var rec2 = await rec1.metadata();
                    console.log(rec2.format);
                    var format = rec2.format;
                    var save = await rec1.toFormat(format, { quality: 60 }).toBuffer();
                    console.log(save);
                    localFilePath = save;
                }
                let uploadResponse;
                try {
                    uploadResponse = await uploadOnCloudinary(localFilePath);
                } catch (err) {
                    console.error("Cloudinary Upload Error:", err.message);
                    return res
                        .status(400)
                        .json({ message: "Error uploading to Cloudinary.", error: err.message });
                }
                if (!uploadResponse || !uploadResponse.secure_url) {
                    return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
                }
                if (uploadResponse) {
                    mediaUrl = uploadResponse.secure_url;
                    mediaType = uploadResponse.resource_type;
                }
            }
        }

        const newPostData = {
            user_id,
            type,
            caption,
            aspectRatio: type === "photo" || "video" ? aspectRatio : null,
            mediaUrl,
            mediaType,
            isPrivate,
            content: type === "textBlog" || "Question" ? content : undefined,
        };
        console.log(newPostData);
        const newPost = new Post(newPostData);
        await newPost.save();

        const user = await User.findById(user_id).populate("roleId");

        // Ensure roleId exists and has a posts array
        if (user.roleId && Array.isArray(user.roleId.posts)) {
            user.roleId.posts.push(newPost._id);
            await user.roleId.save(); // Review : Save the roleId document to persist changes
        } else {
            return res.status(500).json({ success: false, message: "User roleId or posts array not found" });
        }

        return res.status(200).json({ success: true, post: newPost });
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(404).json({ success: false, message: "Failed to create post" });
    }
};

export { createPost };
