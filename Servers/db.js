const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/bookingwebsite', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Lỗi kết nối MongoDB:'));
db.once('open', () => {
  console.log('Kết nối MongoDB thành công.');
});

module.exports = mongoose;
