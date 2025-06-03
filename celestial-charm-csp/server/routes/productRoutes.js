const express = require('express');
const { getKpopProducts, getAnimeProducts } = require('../controllers/productController');

const router = express.Router();

router.get('/kpop', getKpopProducts);
router.get('/anime', getAnimeProducts);

module.exports = router;
