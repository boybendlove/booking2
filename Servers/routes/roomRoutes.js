const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');

// Định tuyến cho các yêu cầu liên quan đến phòng
router.get('/:id', roomController.getRoomById);

module.exports = router;