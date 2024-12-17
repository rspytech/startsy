import {User} from "../../models/user.model.js"
export const checkMessagePrivilege = async(req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const userIdToMessage = req.params.id;
        
        const loggedInUser = await User.findById(loggedInUserId);
        const messagingUser = await User.findById(userIdToMessage);

        if(loggedInUser.followers.includes(userIdToMessage) && messagingUser.followers.includes(loggedInUserId)){
            return res.status(200).json({message: "Message Authentication Successfull"});
        }

        return res.status(400).json({message : "Message Authentication Unsuccessfull"});
    } 
    catch (error) {
        return res.status(500).json({message: "Error while message authentication"});
    }
}