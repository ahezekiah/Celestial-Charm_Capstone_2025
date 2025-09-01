import jwt from "jsonwebtoken";
import 'dotenv/config'
const COOKIE_NAME = process.env.COOKIE_NAME || 'cc_session';
const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent';


export function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.[COOKIE_NAME];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, JWT_SECRET);
        // normalized user id on req.user
        req.user = { sub: decoded.sub };
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

