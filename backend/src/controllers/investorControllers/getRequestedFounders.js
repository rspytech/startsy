// Investor Feed (Chat Page)
import { Investor } from "../../models/investor.model.js";

export const getRequestedFounders = async (req, res) => {
    try {
        const id = req.user._id;
        const investor = await Investor.findOne({ user_id: id })
            .populate('requestedFounders.founder') 
            .exec();

        if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
        }

        return res.json({
            message : "Requested Founders Retrieved Successfully",
            requestedFounders : investor
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving requested founders:', error });
    }
};