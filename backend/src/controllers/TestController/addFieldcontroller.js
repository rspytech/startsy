import { General } from "../../models/general.model.js";
import { Post } from "../../models/post.model.js";
import { User } from "../../models/user.model.js";

const addField = async(req,res)=>{
    try {
        // Update existing documents to include isInvestorVerified with default value false
        await User.updateMany(
            { investorRejected: { $exists: false } }, // Only update if the field doesn't exist
            { $set: { investorRejected: false } }
        );

        res.send("Field 'isPrivate' added to all existing records.");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating documents.");
    }
}

export default addField