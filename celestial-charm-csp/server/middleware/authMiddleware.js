import jwt from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    const token =
        req.cookies?.token ||
        (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // or { id: payload.id, ... }
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
