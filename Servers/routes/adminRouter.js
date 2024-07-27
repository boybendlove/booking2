const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController.js');
const InfoController = require('../controllers/InfoController');
const hotelController = require('../controllers/HotelController');
const roomController = require('../controllers/roomController');
const transactionController = require('../controllers/transactionController');


router.post('/login', AdminController.login);
router.post('/register', AdminController.register);
router.get('/getCustomers', AdminController.getCustomers)
//info
router.get('/userCount', InfoController.userCount);
router.get('/transactionCount',InfoController.transactionCount);
router.get('/totalRevenue',InfoController.totalRevenue);
router.get('/averageMonthlyRevenue',InfoController.averageMonthlyRevenue);
//hotel api
router.get('/Hotels',hotelController.getAllHotels);
router.post('/Hotels/new', hotelController.createHotel);
router.put('/Hotels/update/:hotelId', hotelController.updateHotel);
router.delete('/Hotels/delete/:hotelId', hotelController.deleteHotel);
//room api
router.get('/Room',roomController.getAllRoom);
router.post('/Room/new', roomController.createRoom);
router.put('/Room/update/:roomID', roomController.updateRoom);
router.delete('/Room/delete/:roomID', roomController.deleteRoom);
//trasaction api
router.get('/Transaction',transactionController.getAllTransaction);
router.put('/Transaction/update/:transactionID', transactionController.updateTransaction);

module.exports = router;