import { User } from "../../models/user.model.js";

async function getUserFollowers(req, res) {
    console.log("route");

    const userId = req.params.id;
    var temp = await User.findOne({ _id: userId });
    console.log(temp);

    res.send({
        followers: temp.followers,
        following: temp.following,
    });
}

export default getUserFollowers;
