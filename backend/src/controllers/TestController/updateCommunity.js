import { Community } from "../../models/community.model.js";

const UpdateCommunity = async (req, res) => {


    const { id } = req.params
    console.log(id);
    var {communityName , communityDescription} = req.body
    console.log(communityName);
    console.log(communityDescription);
    
    
    try {
        const updatedCommunity = await Community.findOneAndUpdate(
            { _id: id },  // Ensure user is an admin
            { communityName: communityName , communityDescription: communityDescription},
            { new: true }  // Return the updated document
        );
        return res.status(200).json({ message: `Group detailed ok  Successfully` });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to Lock Group.' });
    }

}
export default UpdateCommunity