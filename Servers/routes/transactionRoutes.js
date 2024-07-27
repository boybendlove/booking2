const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post('/reserve-room', transactionController.reserveRoom);
router.get('/view/:userId', transactionController.viewTransaction)

module.exports = router;