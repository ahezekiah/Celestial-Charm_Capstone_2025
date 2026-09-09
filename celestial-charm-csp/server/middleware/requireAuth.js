import jwt from "jsonwebtoken";
import "dotenv/config";

const COOKIE_NAME =
    process.env.COOKIE_NAME;

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error(
        "JWT_SECRET is missing from the environment variables."
    );
}

export function requireAuth(req, res, next) {
    try {
        const headerToken =
            req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : null;

        const token =
            req.cookies?.[COOKIE_NAME] || headerToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const payload = jwt.verify(token, JWT_SECRET);

        // This was the main bug
        req.user = {
            id: payload.sub,
        };

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
}