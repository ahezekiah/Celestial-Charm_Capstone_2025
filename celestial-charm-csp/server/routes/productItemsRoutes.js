const express = require('express');
const { getKpopProducts, getAnimeProducts, getKpopProducts2, getAnimeProducts2 } = require('../controllers/productController');

const router = express.Router();

router.get('/kpop', getKpopProducts);
router.get('/anime', getAnimeProducts);
router.get('/kpop2', getKpopProducts2);
router.get('/anime2', getAnimeProducts2);

module.exports = router;
