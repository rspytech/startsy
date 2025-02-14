// Investor feed (Home page) Plus button functionality
 
import { Investor } from "../../models/investor.model.js";
import { Founder } from "../../models/founder.model.js";
import { upvoteProfile } from "../../models/upvoteProfile.model.js";

export const addFounderProfile = async(req, res) => {
    try {
        const { id } = req.params;
        const investorId = req.user._id;
        
        const investor = await Investor.findOne({user_id : investorId});
        const founderProfile = await Founder.findOne({user_id : id});

        console.log(founderProfile.fullName);

        if (!investor) {
            return res.status(404).json({ message: 'Investor not found' });
        }

        if (!founderProfile) {
            return res.status(404).json({ message: 'Founder not found' });
        }
        
        if(investor.requestedFounders.includes(id)){
            return res.status(400).json({
                message: 'You have already requested this founder',
            });
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

        await upvoteProfile.create({
            investor: investorId,
            founder: id,
        });

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