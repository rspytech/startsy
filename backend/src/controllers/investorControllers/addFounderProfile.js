// Investor feed (Home page) Plus button functionality
 
import { Investor } from "../../models/investor.model.js";
import { Founder } from "../../models/founder.model.js";

export const addFounderProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const investorId = req.user._id;
        
        const investor = await Investor.findOne({user_id : investorId});
        const founderProfile = await Founder.findOne({user_id : id});

        if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
        }

        if (!founderProfile) {
            return res.status(404).json({ message: 'Founder not found' });
        }
        
        investor.requestedFounders.push({
            founder : id,
            requestDate : Date.now(),
        });

        founderProfile.requestNotifications.push({
            investor: investorId,
            requestDate: Date.now(),
        });

        await investor.save();
        await founderProfile.save();


        return res.status(200).json({
            success: true,
            message: "Request sent to founder successfully.",
            data: investor,
        });
    }
    
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred while sending request to founder.",
            error: error.message,
        });
    }
}