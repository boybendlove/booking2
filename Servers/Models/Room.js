const mongoose = require('../db');

const roomSchema = new mongoose.Schema({
  title: {type: String,required: true },
  desc: {type: String,required: true},
  maxPeople: {type: Number,required: true},
  price: {type: Number,required: true},
  roomNumbers: { type: [Number],required: true},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date,default: Date.now}
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
