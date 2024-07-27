const express = require('express');
const imageController = require('../controllers/imageController');

const router = express.Router();

router.get('/:city', imageController.getImageByCity);

module.exports = router;