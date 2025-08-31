import jwt from "jsonwebtoken";
import 'dotenv/config'

const COOKIE_NAME = process.env.COOKIE_NAME || 'cc_session';
const JWT_SECRET = process.env.JWT_SECRET || 'AteezPresent';

export function requireAuth(req, res, next) {
    const bearer = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.slice(7)
        : null;

    const token = req.cookies?.[COOKIE_NAME] || bearer;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        // we store the user id in `sub`
        req.userId = payload.sub;
        return next();
    } catch {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
