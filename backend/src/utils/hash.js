// One-way fingerprint (SHA-256) of a PAN number, so it can be matched without storing it in plain text.

import crypto from "crypto";

const hashPan = (pan) => {
    return crypto.createHash("sha256").update(pan).digest("hex");
};

export { hashPan };
