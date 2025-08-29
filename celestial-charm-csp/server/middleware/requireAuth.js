import jwt from 'jsonwebtoken';

export default function requireAuth(req, res, next) {
    try {
        const token =
        req.cookies?.cc_session ||
        (req.headers.authorization?.startsWith('Bearer ')
            ? req.headers.authorization.slice(7)
            : null);

        if (!token) return res.status(401).json({ message: 'Unauthorized' });

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = { userId: payload.sub }; // keep it tiny; don’t hit DB here
        next();
    } catch {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

