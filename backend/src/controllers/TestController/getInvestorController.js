import { User } from "../../models/user.model.js";

const getInvestorStatus = async(req,res)=>{
    const userId = req.user._id;

    try{
        var rec1 = await User.findOne({_id : userId}).select("isInvestorVerified investorRejected role userName status")
        console.log(rec1);
        
        const accessToken = rec1.generateAccessToken();
        console.log(accessToken);
        
        return res.status(200).json({message: rec1 , token : accessToken});

    }
    catch(e){
        console.error(e);
        return res.status(500).json({message: "Internal Server Error"});
    }

}
export default getInvestorStatus