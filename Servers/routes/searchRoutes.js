const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

router.get('/search_hotels', searchController.search_hotels);

module.exports = router;
