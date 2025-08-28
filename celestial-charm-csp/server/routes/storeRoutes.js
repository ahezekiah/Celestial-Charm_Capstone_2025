import { Router } from 'express';
const router = Router();
import { verifyToken } from '../middleware/authMiddleware';
import { listStoreItems, purchseWithGems, getInventory } from '../controllers/storeController';

router.get('/items', listStoreItems);
router.post('/purchase-gems', verifyToken, purchseWithGems);
router.get('/inventory', verifyToken, getInventory);

export default router;