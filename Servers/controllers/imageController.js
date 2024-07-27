const path = require('path');

const getImageByCity = (req, res) => {
  const city = req.params.city.toLowerCase();
  const imagePath = path.join(__dirname, `../CityImage/${city}.jpg`);

  // Giả sử bạn đã xử lý lỗi khi tệp không được tìm thấy
  res.sendFile(imagePath);
};

module.exports = {
  getImageByCity,
};