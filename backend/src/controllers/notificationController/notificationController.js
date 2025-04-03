import { User } from "../../models/user.model.js";

var updateNotificationToken = async (req, res) => {
    var user_id = req.user._id;
    try{
        var user = await User.findByIdAndUpdate(user_id,
             { $set: { notificationToken: req.body.notificationToken } }, { new: true });
        res.status(200).json({ message: "Notification Token updated successfully" });
    }
    catch(err){
        res.status(500).json({ message: "Internal server error" });
    }
}

export default updateNotificationToken;