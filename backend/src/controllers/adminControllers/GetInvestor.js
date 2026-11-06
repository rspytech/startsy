import { User } from "../../models/user.model.js";

const getInvestor = async (req, res) => {
    var rec1 = await User.find({ role: "Investor", isInvestorVerified: false }).populate({
        path: "roleId",
    });
    res.status(200).json({ message: rec1 });
};

export default getInvestor;
