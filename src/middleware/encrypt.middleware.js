import { aesEncrypt } from "../utils/aes.js";
import { hashPan } from "../utils/hash.js";

const encryptPan = async(req, res, next) => {

    // Fetch aes key from the env
    const aesKey = Buffer.from(process.env.AES_KEY, 'hex');

    try {
        const { panCard } = req.body;

        const hashedPan = hashPan(panCard);
        req.hashedPan = hashedPan;   // ismai index rahega
        
        const encryptedPanCardInfo = aesEncrypt(panCard, aesKey);
        req.pan = encryptedPanCardInfo    // ismai iv and data rahega

        next();

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error"
        })
    }

}

export { encryptPan };