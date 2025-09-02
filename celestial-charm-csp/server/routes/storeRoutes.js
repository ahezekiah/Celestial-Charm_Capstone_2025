import { Router } from 'express';
const router = Router();

import { requireAuth } from '../middleware/requireAuth.js';
import { 
    getGemBundles,
    purchaseGemBundle,
    listStoreItems,
    purchseWithGems,         // note the spelling used everywhere
    getCart, 
    addToCart, 
    removeFromCart, 
    moveToCart, 
    moveToWishlist, 
    checkoutCart,
    getInventory, 
    addToWishlist, 
    getWishlist, 
    removeFromWishlist,
    purchaseCustomGems,
    syncCart


} from '../controllers/storeController.js';

router.get('/items', listStoreItems);
router.get('/inventory', requireAuth, getInventory);

router.post('/purchase-gems', requireAuth, purchseWithGems);

router.get('/cart', requireAuth, getCart);
router.get('/wishlist', requireAuth, getWishlist);
router.post('/cart/add', requireAuth, addToCart);
router.post('/wishlist/add', requireAuth, addToWishlist);
router.post('/cart/remove', requireAuth, removeFromCart);
router.post('/wishlist/remove', requireAuth, removeFromWishlist);
router.post('/move-to-wishlist', requireAuth, moveToWishlist);
router.post('/move-to-cart', requireAuth, moveToCart);
router.post('/cart/checkout', requireAuth, checkoutCart);
router.post('/cart/sync', requireAuth, syncCart);

router.get('/gem-bundles', requireAuth, getGemBundles);
router.post('/gem-bundles/purchase', requireAuth, purchaseGemBundle);
router.post('/gem-bundles/purchase-custom', requireAuth, purchaseCustomGems);


export default router;