import { Investor } from "../models/investor.model.js";

export const InvestorInfo = async (req, res) => {

    const { 
        contactInfo,
        previousExperience,
        areaOfInterest,
        startupStage,
        preferredSector,
        investmentRange
    } = req.body;

    try {
        

        const hashedPanCard = req.hashedPan;
        const encryptedPanCard = req.pan;
        const newInvestor = new Investor({
            contactInfo,
            previousExperience,
            areaOfInterest,
            panCard: {
                index: hashedPanCard,
                pan: encryptedPanCard
            },
            startupStage,
            preferredSector,
            investmentRange,
            user_id: req.user._id
        });
        await newInvestor.save();

        res.status(200).send({
            message: "Investor Details uploaded successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
    

}