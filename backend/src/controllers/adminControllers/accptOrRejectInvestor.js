import { User } from "../../models/user.model.js";

const accptOrRejectInvestor = async (req, res) => {
    var id = req.params.id;
    var status = req.params.status;

    var status1 = status == "true" ? "accepted" : "rejected";
    var booleanStatus = status == "true" ? true : false;

    if (!id) return;

    try {
        var rec1 = await User.findOneAndUpdate({ _id: id }, { $set: { isInvestorVerified: booleanStatus } });
        if (booleanStatus == false) {
            var rec1 = await User.findOneAndUpdate({ _id: id }, { $set: { investorRejected: true } });
        }
        return res.status(200).json({ message: `Investor ${status1} succesfully` });
    } catch (e) {
        console.log(e);
        return res.status(404).json({ message: e.message });
    }
};

export default accptOrRejectInvestor;
