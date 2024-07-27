const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/HotelController');

// Định nghĩa route để lấy thông tin khách sạn dựa trên id
router.get('/:id', hotelController.getHotelById);

module.exports = router;