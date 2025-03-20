import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

// Load AES key from environment variable
const aesKey = Buffer.from(process.env.AES_KEY, 'hex');

// Hashing function
const hashPan = (pan) => {
    return crypto.createHash('sha256').update(pan).digest('hex');
};

// AES encryption function
const aesEncrypt = (data, key) => {
    const iv = crypto.randomBytes(16); // Initialization vector
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        data: encrypted
    };
};

// AES decryption function
const aesDecrypt = (encryptedData, key) => {
    const { iv, data } = encryptedData;
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// PAN card information
// const panCardInfo = "ABCDE1234F";

// Hash the PAN card information for indexing and verification
// const hashedPanCardInfo = hashPan(panCardInfo);
// console.log('Hashed PAN Card Info:', hashedPanCardInfo);

// Encrypt the original PAN card information
// const encryptedPanCardInfo = aesEncrypt(panCardInfo, aesKey);
// console.log('Encrypted PAN Card Info:', encryptedPanCardInfo);

// Store hashedPanCardInfo in the database as an index/token
// Store encryptedPanCardInfo in the database for secure storage

// Example of verifying data upon retrieval
// const retrievedEncryptedData = encryptedPanCardInfo; // Simulate retrieval

const decryptedPanCardInfo = aesDecrypt(enc, aesKey);
console.log(decryptedPanCardInfo)

// Hash the decrypted PAN card information and compare with the stored hash
const recalculatedHash = hashPan(decryptedPanCardInfo);
console.log(recalculatedHash)

// if (recalculatedHash === hashedPanCardInfo) {
//     console.log('The decrypted data is valid.');
// } else {
//     console.log('The decrypted data is invalid.');
// }
