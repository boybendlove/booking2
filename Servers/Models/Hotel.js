const mongoose = require('../db');
const Room = require('./Room.js');

const hotelSchema = new mongoose.Schema({
  address: String,
  cheapestPrice: Number,
  city: String,
  desc: String,
  distance: String,
  featured: Boolean,
  name: String,
  photos: [String],
  rooms: [String],
  title: String,
  type: String,
  rating: Number,
});
hotelSchema.methods.getDetailedRooms = async function () {
  const detailedRooms = await Room.find({ _id: { $in: this.rooms } });
  return detailedRooms;
};
const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;


