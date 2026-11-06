const getApkUrlForwebsite = async (req, res) => {
    console.log("kk");

    try {
        const fileUrl = "https://expo.dev/artifacts/eas/3LDfY42Yxjb6iVEZQXU72o.apk";
        const response = await fetch(fileUrl);
        console.log(response);

        // Use arrayBuffer instead of buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        res.setHeader("Content-Type", "application/vnd.android.package-archive");
        res.setHeader("Content-Disposition", "attachment; filename=Startsy111.apk");
        res.send(buffer);
    } catch (err) {
        console.error("Download error:", err);
        res.status(500).send("Failed to download file");
    }
};
export default getApkUrlForwebsite;
