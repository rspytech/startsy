import { Community } from "../../models/community.model.js"
import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";
import { Conversation } from "../../models/conversation.model.js";

export const createCommunityPost = async (req, res) => {
    try {
        const user_id = req.user._id;
        const type = req.params.postType;

        const {communityName, communityDescription, communityRules} = req.body;
        const community = await Community.create({
            communityName, 
            communityDescription,
            communityRules,
            communityAdmin : user_id,
        });
        
        if(!community){
            return res.status(400).json({message: "Failed to create community post"});
        }

        const newPost = await Post.create({
            user_id,
            type,
            communityPost : community._id,
        });

        const user = await User.findById(user_id).populate("roleId");

        if (user.roleId && Array.isArray(user.roleId.posts)) {
            user.roleId.posts.push(newPost._id);
            user.communityList.push(community._id);
            community.communityMembers.push(user_id);
            await Conversation.create({
                communityId : community._id,
                isGroup : true,
            });
            await user.save();
            await user.roleId.save();
            await community.save();
        }

        else {
            return res.status(500).json({ success: false, message: 'User roleId or posts array not found' });
        }

        return res.status(201).json({ success: true, post: newPost });
    }
    catch (error) {
        
    }
}