import crypto from 'crypto';

const hashPan = (pan) => {
    return crypto.createHash('sha256').update(pan).digest('hex');
};

export {hashPan};