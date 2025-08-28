import { verify } from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized. Access denied.' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        console.log(`Decoded Token: ${decoded}`);
        req.user = { id: decoded.id }; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ error: 'Unauthorized. Invalid token.' });
    }
};

export default { verifyToken };