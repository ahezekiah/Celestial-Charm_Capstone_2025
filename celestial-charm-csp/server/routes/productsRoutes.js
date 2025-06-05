const express = require('express');
const router = express.Router();
const {
  getFashionProducts,
  getFragranceProducts,
  getJewelryProducts
} = require('../controllers/productsController');

router.get('/debug-check', (req, res) => {
  res.send('✅ This is the CORRECT productsRoutes.js file!');
});


// 💥 YOU MUST wrap the controller like this:
router.get('/fashion', (req, res) => {
  req.query.type = 'fashion';
  console.log("🧪 Injected type:", req.query.type);
  getFashionProducts(req, res);
});

router.get('/fragrances', (req, res) => {
  req.query.type = 'fragrance';
  console.log("🧪 Injected type:", req.query.type);
  getFragranceProducts(req, res);
});

router.get('/jewelry', (req, res) => {
  req.query.type = 'jewelry';
  console.log("🧪 Injected type:", req.query.type);
  getJewelryProducts(req, res);
});

module.exports = router;


