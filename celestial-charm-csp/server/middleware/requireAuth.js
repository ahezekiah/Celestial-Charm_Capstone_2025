import jwt from "jsonwebtoken";
import 'dotenv/config'
const COOKIE_NAME = process.env.COOKIE_NAME || 'cc_session';
const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent';


export function requireAuth(req, res, next) {
    try {
        const fromHeader = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;

        const token = req.cookies?.[COOKIE_NAME] || fromHeader; // cookie first, then header
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const payload = jwt.verify(token, JWT_SECRET);
        req.user = { id: payload.sub }; // keep it small and consistent
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
