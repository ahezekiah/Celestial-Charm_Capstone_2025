import { Router } from 'express';
const router = Router();
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
import { register, login } from '../controllers/authController.js';
// import { requireAuth } from '../middleware/requireAuth.js';

router.post('/register', register);
router.post('/login', login);

router.get('/me', (req, res) => {
    const u = req.user;
    res.json({ user: { id: u._id, username: u.username, email: u.email } });
});
export default router;