import { Apk } from "../../models/APK.model.js";
import { Apkuser } from "../../models/ApkUserLinkmodel.js";

const getApklink = async(req, res) => {
    try {

        var userId = req.user._id
        var LatestApk = await Apk.find().sort({ createdAt: -1 });
        var user = await Apkuser.find({userId: userId})


        console.log(user);
        var target = LatestApk[0]
        console.log(target);
        

        if(!user || user.length == 0){
            try{
                var rec1 = new Apkuser({
                    userId: userId,
                    versionNumber: target.versionNumber
                })
                var rec2 = await rec1.save()
                res.status(200).json({msg : "success in creating user" , link :target.url})
            }
            catch(error){
                return res.status(400).json({ error: error.message })
            }
        }


        else {
            if(user.versionNumber == target.versionNumber){
                return res.status(404).json({ msg: "You already have the latest version"})
            }
            else {
                res.status(200).json({msg : "success in getting apk link" , link :target.url})
            }
        }   
        
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export default getApklink