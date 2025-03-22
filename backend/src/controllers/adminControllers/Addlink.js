import { Apk } from "../../models/APK.model.js";

const addApkUrl = async(req, res) => {
    var { url, versionNumber } = req.body;
    try {
        var rec1 = new Apk(req.body)
        var rec2 = await rec1.save()
        res.status(200).json({ message: "APK added successfully",  })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export default addApkUrl