import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// Load AES key from environment variable
const aesKey = Buffer.from(process.env.AES_KEY, "hex");

// AES encryption function
const aesEncrypt = (data, key) => {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(data, "utf8", "hex");
    encrypted += cipher.final("hex");
    return {
        iv: iv.toString("hex"),
        data: encrypted,
    };
};

// AES decryption function
const aesDecrypt = (encryptedData, key) => {
    const { iv, data } = encryptedData;
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(iv, "hex"));
    let decrypted = decipher.update(data, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

export { aesEncrypt, aesDecrypt };
