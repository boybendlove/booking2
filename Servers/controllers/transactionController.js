const Transaction = require('../Models/transaction');

exports.reserveRoom = async (req, res) => {
  const { userId, hotel, rooms, dateStart, dateEnd, price, payment, fullName,email,phone,identityCardNumber } = req.body;
console.log(rooms)
  const newTransaction = new Transaction({
    user: userId,
    hotel: hotel,
    rooms: rooms,
    email: email,
    phone:phone,
    identityCardNumber:identityCardNumber,
    fullName:fullName,
    dateStart: new Date(dateStart),
    dateEnd: new Date(dateEnd),
    price: price,
    payment: payment,
    status: 'Booked',
  });
  
  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewTransaction = async (req, res) => {
  const user = req.params.userId;
  try {
    console.log("ss",user)
    // Tìm tất cả các đơn hàng của người dùng dựa trên userId
    const transaction = await Transaction.find({ user });
    console.log("bb",transaction)
    res.status(200).json(transaction );
} catch (error) {
    res.status(500).json({ message: error.message });
}
}
exports.getAllTransaction = async (req, res) => {
  try {
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: error.message });
  }
};
exports.updateTransaction = async (req, res) => {
  const transactionID = req.params.transactionID
  const {status} = req.body
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionID, {status}, { new: true });
    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Không tìm thấy Transaction' });
    }
    res.json(updatedTransaction);
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin Transaction:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};