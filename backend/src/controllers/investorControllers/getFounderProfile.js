import { Investor } from '../../models/investor.model.js';
import { Founder } from '../../models/founder.model.js'; // Import Founder model

// Assuming RecommendationBasic is already imported
import RecommendationBasic from '../../algorithms/recommendation.js';
import mappings from '../../config/startupPrefrencesMapping.js';

// Initialize RecommendationBasic with mappings
const recommender = new RecommendationBasic(mappings.stage, mappings.sector, mappings.location, mappings.fundingRange);

export const getFounderProfile = async (req, res) => {
    try {
        const investorId = req.user._id;

        // 1. Fetch the investor's preferences
        const investor = await Investor.findOne({ user_id: investorId });
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
            country,
        } = investor;

        // 2. Generate recommendation IDs dynamically
        const investorPreferences = {
            stage: startupStage,
            sector: preferredSector,
            location: country,
            fundingRange: investmentRange,
        };

        const recommendationIds = recommender.recommendation_id(investorPreferences);

        // 3. Fetch founders using regex-based matching
        const regexList = recommendationIds.map(id => new RegExp(`^${id}`, 'i'));
        const matchingFounders = await Founder.find({
            recommendationId: { $in: regexList },
        }).populate("user_id");

        if (matchingFounders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No matching founders found for the investor preferences.',
            });
        }

        // 4. Return the list of matching founders
        res.status(200).json({
            success: true,
            message: "Founder profiles fetched successfully",
            data: matchingFounders,
        });
    } catch (error) {
        // 5. Handle any errors
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while fetching founder profiles',
            error: error.message,
        });
    }
};
