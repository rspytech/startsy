// Investor Feed Home Page (FounderCard Recommendation List)

import { Investor } from '../../models/investor.model.js';

export const getFounderProfile = async (req, res) => {
    try {
        const investorId = req.user._id; // Get the investor ID from request
        // 1. Fetch the investor's preferences
        const investor = await Investor.findOne({user_id : investorId});
        if (!investor) {
            return res.status(404).json({

                success: false,
                message: 'Investor not found.',
            });
        }
        const { 
            preferredSector, 
            startupStage, 
            investmentRange, 
            preferredLocation       /* TODO : To be added in the investor model as a data feild */
        } = investor;

        // 2. Search the Trie for matching founders based on the investor's preferences
        const recommendedFounders = trie.search(
            preferredSector,
            startupStage,
            investmentRange,
            preferredLocation   /* TODO : To be added in the investor model as a data feild */
        );

        // 3. Convert the Set to an array and respond with the matching founders
        if (recommendedFounders.size === 0) {
            return res.status(404).json({
                success: false,
                message: 'No matching founders found for the investor preferences.',
            });
        }
        // Converted the Set to an array
        const founderArray = Array.from(recommendedFounders);        

        res.status(200).json({
            success: true,
            message: "Founder profiles fetched successfully",
            data: founderArray,
        });

    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error occurred while fetching founder profiles',
            error: error.message,
        });
    }
};
