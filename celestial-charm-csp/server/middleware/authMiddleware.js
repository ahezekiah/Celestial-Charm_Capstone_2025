// import jwt from 'jsonwebtoken';

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader) return res.status(401).json({ error: 'Unauthorized. Access denied.' });

//     const token = authHeader.split(' ')[1];
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         console.log(`Decoded Token: ${decoded}`);
//         req.user = { id: decoded.id }; // Attach user info to request object
//         next(); // Proceed to the next middleware or route handler
//     } catch (error) {
//         return res.status(403).json({ error: 'Unauthorized. Invalid token.' });
//     }
// };

// export default { verifyToken };

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
