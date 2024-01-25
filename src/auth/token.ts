import { sign } from 'jsonwebtoken';
import config from '../config/config';
import { encrypt } from '../utils/encrypt';

export const generateToken = (userId: string) => {
    const payload = {
        userIdEnc: encrypt(userId),
    };

    console.log('generateToken expiresIn', config.server.tokenExpiration);

    return sign(payload, config.keys.tokenKey, { expiresIn: config.server.tokenExpiration });
};

export const generateRefreshToken = (userId: string) => {
    const payload = {
        userIdEnc: encrypt(userId),
    };

    return sign(payload, config.keys.tokenKey);
};
