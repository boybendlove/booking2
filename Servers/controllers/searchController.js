// server/routes/search.js
const express = require('express');
const router = express.Router();
const Hotel = require('../Models/Hotel');
const Transaction = require('../Models/transaction');
const Room = require('../Models/Room');
const { RunCommandCursor } = require('mongodb');

// Tìm kiếm khách sạn phù hợp
const search_hotels =  async (req, res) => {
  const { city, startDate, endDate, numRooms, numPeople } = req.query;

  try {
    // Lấy danh sách khách sạn thỏa mãn điều kiện
    const hotels = await Hotel.find({ city });

   
    // Lọc khách sạn có phòng trống trong khoảng thời gian cần tìm kiếm
    const availableHotels = await Promise.all(hotels.map(async (hotel) => {
      // Lặp qua từng phòng của khách sạn để lấy thông tin và tính tổng số phòng
      let totalRooms = 0;
      for (let i = 0; i < hotel.rooms.length; i++) {
        const room = await Room.findOne({ _id: { $in: hotel.rooms[i] } });
        // console.log(room);
        // console.log(room ? room.roomNumbers : null); // Kiểm tra nếu room không null thì truy cập vào roomNumbers, ngược lại trả về null
        totalRooms += room && room.roomNumbers ? room.roomNumbers.length : 0;
      }
      // console.log(totalRooms)
      // Lấy thông tin các giao dịch đã tồn tại
      const existingTransactions = await Transaction.find({
        hotel: hotel._id,
        $or: [
          { $and: [{ dateStart: { $gte: startDate } }, { dateStart: { $lt: endDate } }] },
          { $and: [{ dateEnd: { $gt: startDate } }, { dateEnd: { $lte: endDate } }] },
        ],
      });
      // console.log("ket qua t1",existingTransactions)
      // Tính toán số phòng trống
      const availableRooms = totalRooms - existingTransactions.length;
      // const availableRooms = totalRooms
      // Kiểm tra điều kiện và trả về thông tin khách sạn
      if (availableRooms >= numRooms) {
        return { ...hotel._doc, availableRooms };
      } else {
        return null;
      }

    } 
     ));
    //  console.log("ket qua t2",availableHotels)
    // Lọc khách sạn có đủ số người
    const filteredHotels = availableHotels.filter(async (hotel) => {
      let hasRoomWithEnoughCapacity = false;
    
      for (let i = 0; i < hotel.rooms.length; i++) {
        const room = await Room.findOne({ _id: { $in: hotel.rooms[i] } });
        if (room && room.maxPeople >= numPeople) {
          hasRoomWithEnoughCapacity = true;
          break;
        }
      }
    
      return hotel && hotel.availableRooms >= numRooms && hasRoomWithEnoughCapacity;
    });
    console.log("ket qua cuoi cung",filteredHotels)
    res.json(filteredHotels);
  } catch (error) {
    console.error('Error searching hotels', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {search_hotels};
