const mongoose = require('../db');

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  hotel: { type: String, required: true },
  rooms: [{ _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Room'},
        roomNumbers:[{ type: String, required: true }]}],
  email: { type: String, required: true },
  phone: { type: String, required: true },
  identityCardNumber: { type: String, required: true },
  fullName: { type: String, required: true },
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true },
  status: { type: String, enum: ['Booked', 'Checkin', 'Checkout'], default: 'Booked' },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;