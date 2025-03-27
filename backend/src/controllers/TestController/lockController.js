import { Community } from "../../models/community.model.js";

const lockCommunity = async (req, res) => {


    const { id, status } = req.params
    console.log(id);
    console.log(status);
    
    var stat = status == "locked" ? true : false
    console.log(stat);
    try {
        const updatedCommunity = await Community.findOneAndUpdate(
            { _id: id },  // Ensure user is an admin
            { isLock: stat },
            { new: true }  // Return the updated document
        );
        return res.status(200).json({ message: `Group ${status} Successfully` });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to Lock Group.' });
    }

}
export default lockCommunity