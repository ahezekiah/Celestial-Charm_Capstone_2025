const express = require('express');
const router = express.Router();
const {
  getFashionProducts,
  getFragranceProducts,
  getJewelryProducts,
  
} = require('../controllers/productsController');


router.get('/debug-check', (req, res) => {
  res.send('✅ This is the CORRECT productsRoutes.js file!');
});


router.get('/fashion', getFashionProducts);
router.get('/fragrances', getFragranceProducts);
router.get('/jewelry', getJewelryProducts);


module.exports = router;


