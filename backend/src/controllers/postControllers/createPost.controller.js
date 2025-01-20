import { User } from '../../models/user.model.js';
import { uploadOnCloudinary } from '../../../cloudinary.js';
import {Post} from '../../models/post.model.js';

const createPost = async (req, res) => {
    try {
        const type = req.params.postType;
        const { caption, content } = req.body;
        const user_id = req.user._id;

        let mediaUrl = null;
        let mediaType = null;

        if (type === "photo" || type === "video") {
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
            if(localFilePath){
                let uploadResponse;
                try {
                    uploadResponse = await uploadOnCloudinary(localFilePath);
                } catch (err) {
                    console.error("Cloudinary Upload Error:", err.message);
                    return res.status(400).json({ message: "Error uploading to Cloudinary.", error: err.message });
                }
                if (!uploadResponse || !uploadResponse.secure_url) {
                    return res.status(400).json({ message: "Failed to upload photo to Cloudinary." });
                }
                if(uploadResponse){
                    mediaUrl = uploadResponse.secure_url;
                    mediaType = uploadResponse.resource_type;
                }
            }            
        }

        const newPostData = {
            user_id,
            type,
            caption,
            mediaUrl,
            mediaType,
            content: type === "textBlog" ? content : undefined,
        };

        const newPost = new Post(newPostData);
        await newPost.save();

        const user = await User.findById(user_id).populate("roleId");

        // Ensure roleId exists and has a posts array
        if (user.roleId && Array.isArray(user.roleId.posts)) {
            user.roleId.posts.push(newPost._id);
            await user.roleId.save(); // Review : Save the roleId document to persist changes
        }
        
        else {
            return res.status(500).json({ success: false, message: 'User roleId or posts array not found' });
        }

        return res.status(200).json({ success: true, post: newPost });
    }
    catch (error) {
        console.error('Error creating post:', error);
        return res.status(404).json({ success: false, message: 'Failed to create post' });
    }
};

export { createPost };
