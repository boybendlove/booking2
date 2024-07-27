
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/HomeController');


router.get('/countsByCity', homeController.getHotelCountsByCity);
router.get('/countsByType', homeController.getHotelCountsByType);
router.get('/topRatedHotels', homeController.getTopRatedHotels);
router.get('/getAllHotels', homeController.getAllHotels);

module.exports = router;

