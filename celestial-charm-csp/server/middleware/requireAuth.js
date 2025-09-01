import jwt from "jsonwebtoken";
import 'dotenv/config'
import User from "../models/User.js";
const COOKIE_NAME = process.env.COOKIE_NAME || 'cc_session';
const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent';


export function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.cc_session;
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, JWT_SECRET);
        // normalized user id on req.user
        req.user = { sub: decoded.sub };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

