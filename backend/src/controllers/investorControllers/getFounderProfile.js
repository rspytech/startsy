import { Investor } from '../../models/investor.model.js';
import Recommendation from '../../models/recommendation.model.js';
// Assuming RecommendationBasic is already imported
import RecommendationBasic from '../../algorithms/recommendation.js';
import mappings from '../../config/startupPrefrencesMapping.js';
import { General } from '../../models/general.model.js';

// Initialize RecommendationBasic with mappings
const recommender = new RecommendationBasic(mappings.stage, mappings.sector, mappings.location, mappings.fundingRange);

export const getFounderProfile = async (req, res) => {
    try {
        const investorId = req.user._id;

        // 1. Fetch the investor's preferences
        const investor = await General.findOne({ user_id: investorId });
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
        console.log(recommendationIds);
        // 3. Generate regex for broader matching
        const regexList = recommendationIds.map(id => new RegExp(`${id}`));
        console.log(regexList);
        // 4. Query Recommendation schema using regexList
        const matchingRecommendations = await Recommendation.find({
            // recommendationId: { $in: regexList },
        }).populate({
            path: 'matchingFounders',
            populate: {
                path: 'user_id',
            }
        });
        // Populate founders for each recommendation

        console.log(matchingRecommendations);

        if (matchingRecommendations.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No matching recommendations found for the investor preferences.',
            });
        }

        // 5. Extract all founders from the matching recommendations
        const recommendedFounders = matchingRecommendations.flatMap(
            (recommendation) => recommendation.matchingFounders
        );

        // console.log(recommendedFounders);

        res.status(200).json({
            success: true,
            message: "Recommended founders fetched successfully",
            data: recommendedFounders,
        });
    } catch (error) {
        // 6. Handle any errors
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred while fetching recommended founders',
            error: error.message,
        });
    }
};
