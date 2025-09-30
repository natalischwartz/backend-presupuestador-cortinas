import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config/config.js'

export const verifySession = (req, res, next) => {
    const token = req.cookies['access-token'] || req.headers.authorization?.split(' ')[1];
    
    req.session = { user: null }

    if (token) {
        try {
            const data = jwt.verify(token, SECRET_JWT_KEY);
            req.session.user = data;
        } catch (error) {
            console.error("Token verification failed:", error.message);
            // No mandamos error para no romper el flujo
        }
    }
    next();
}