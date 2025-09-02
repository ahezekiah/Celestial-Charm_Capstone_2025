import { Router } from 'express';
const router = Router();

import { requireAuth } from '../middleware/requireAuth.js';
import { listStoreItems, purchseWithGems, getInventory } from '../controllers/storeController.js';

router.get('/items', listStoreItems);
router.post('/purchase-gems', requireAuth, purchseWithGems);
router.get('/inventory', requireAuth, getInventory);

export default router;