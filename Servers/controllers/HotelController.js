const Hotel = require('../Models/Hotel');


// Lấy thông tin của một khách sạn dựa trên ID
const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).json({ error: 'Không tìm thấy khách sạn' });
    }
    res.json(hotel);
  } catch (error) {
    console.error('Lỗi khi lấy thông tin khách sạn:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// Tạo một khách sạn mới
const createHotel = async (req, res) => {
  const { address,cheapestPrice, city, desc,distance, featured, name, photos, rooms,title, type} = req.body;
  
  try {
    const newHotel = new Hotel({address, cheapestPrice, city, desc,distance, featured, name, photos, rooms, title, type, rating: 0,});
    await newHotel.save();
    res.status(201).json(newHotel);
  } catch (error) {
    console.error('Lỗi khi tạo khách sạn:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};
const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin của một khách sạn
const updateHotel = async (req, res) => {
  const { address, heapestPrice, city, desc,distance, featured, name, photos, rooms,title, type} = req.body;
  const hotelId = req.params.hotelId
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(hotelId, {address,heapestPrice, city, desc,distance, featured, name, photos, rooms, title, type}, { new: true });
    if (!updatedHotel) {
      return res.status(404).json({ error: 'Không tìm thấy khách sạn' });
    }
    res.json(updatedHotel);
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin khách sạn:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

// Xóa một khách sạn
const deleteHotel = async (req, res) => {
  const hotelId = req.params.hotelId
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);
    if (!deletedHotel) {
      return res.status(404).json({ error: 'Không tìm thấy khách sạn' });
    }
    res.json({ message: 'Khách sạn đã được xóa thành công' });
  } catch (error) {
    console.error('Lỗi khi xóa khách sạn:', error);
    res.status(500).json({ error: 'Lỗi máy chủ' });
  }
};

module.exports = {
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getAllHotels
};