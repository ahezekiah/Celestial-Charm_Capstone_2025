import { Router } from 'express';
const router = Router();
import { getFashionProducts, getFragranceProducts, getJewelryProducts } from '../controllers/productsController';


router.get('/debug-check', (req, res) => {
  res.send('✅ This is the CORRECT productsRoutes.js file!');
});


router.get('/fashion', getFashionProducts);
router.get('/fragrances', getFragranceProducts);
router.get('/jewelry', getJewelryProducts);


export default router;


