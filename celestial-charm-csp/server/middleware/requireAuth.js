import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
    try {
        const token =
            req.cookies?.access_token || req.signedCookies?.access_token;

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach to req for downstream use
        req.user = { _id: payload.sub, email: payload.email, username: payload.username };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
