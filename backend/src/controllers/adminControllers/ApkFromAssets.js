import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ApkFromAssets = (req, res) => {
    const filePath = path.join(__dirname, "../../APK/Startsy.apk");

    if (!fs.existsSync(filePath)) {
        console.error("File not found:", filePath);
        return res.status(404).send("APK file not found");
    }

    // Set up listener to detect aborted requests
    req.on("aborted", () => {
        console.warn("Request aborted by the client");
    });
    res.setHeader("Content-Disposition", "attachment; filename=Startsy.apk");
    res.setHeader("Content-Type", "application/vnd.android.package-archive");

    // Send the file
    res.download(filePath, "Startsy.apk", (err) => {
        if (err && !res.headersSent) {
            console.error("Download error:", err);
            return res.status(500).send("Failed to download the APK.");
        }
    });
};

export default ApkFromAssets;
