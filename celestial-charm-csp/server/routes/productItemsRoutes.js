import { Router } from 'express';
import { getKpopProducts, getAnimeProducts, getKpopProducts2, getAnimeProducts2 } from '../controllers/productController.js';

const router = Router();

router.get('/kpop', getKpopProducts);
router.get('/anime', getAnimeProducts);
router.get('/kpop2', getKpopProducts2);
router.get('/anime2', getAnimeProducts2);

export default router;
