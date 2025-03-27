import {User} from "../../models/user.model.js"

const getInvestor = async (req,res)=>{
    var rec1 = await User.find({role : "Investor" , isInvestorVerified : false}).select("userName contactInfo role profilePhoto").populate({
        path : "roleId",
        select : "linkedInUrl websiteUrl domainEmail panCard investorType"
    })
    res.send(rec1)
}


export default getInvestor;