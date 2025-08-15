const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { listStoreItems, purchseWithGems, getInventory } = require('../controllers/storeController');

router.get('/items', listStoreItems);
router.post('/purchase-gems', verifyToken, purchseWithGems);
router.get('/inventory', verifyToken, getInventory);

module.exports = router;