import { Router } from 'express';
const router = Router();
import { register, login, me, logout } from '../controllers/authController.js';
import  requireAuth  from '../middleware/requireAuth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/me', requireAuth, me);
router.post('/logout', logout);


export default router;