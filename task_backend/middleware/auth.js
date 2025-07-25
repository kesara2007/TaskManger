// middleware/auth.js
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export default async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({success: false, message: "Not Authorized, token missing"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        
        
        if (payload.exp && payload.exp < Date.now() / 1000) {
            return res.status(401).json({success: false, message: "Token expired"});
        }

        const user = await User.findById(payload.id).select("_id");
        
        
        if(!user) {
            return res.status(401).json({success: false, message: "User not found"});
        }

        req.user = user;
        next();

    } catch (err) {
        console.error("JWT verification failed:", err);
        
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({success: false, message: "Token expired. Please login again"});
        }
        
        res.status(401).json({success: false, message: "Token invalid"});
    }
}