// homeController.js
const Hotel = require('../Models/Hotel');

const getHotelCountsByCity = async (req, res) => {
  try {
    // Lấy số lượng khách sạn theo thành phố
    const counts = await Hotel.aggregate([
      { $group: { _id: '$city', count: { $sum: 1 } } },
    ]);

    // Tạo một mapping giữa thành phố và ảnh
    const cityPhotos = {
      'Ha Noi': 'http://localhost:5000/api/images/HaNoi',
      'Ho Chi Minh': 'http://localhost:5000/api/images/HoChiMinh',
      'Da Nang': 'http://localhost:5000/api/images/DaNang',
    };

    // Tạo một danh sách các thành phố bạn quan tâm
    const citiesOfInterest = ['Ha Noi', 'Ho Chi Minh', 'Da Nang'];

    // Bổ sung các thành phố còn thiếu vào kết quả
    const resultWithPhotos = citiesOfInterest.map((city) => {
      const foundCity = counts.find((cityInfo) => cityInfo._id === city);
      const count = foundCity ? foundCity.count : 0;
      const photo = cityPhotos[city]; 

      return {
        city,
        count,
        photo,
      };
    });

    res.json(resultWithPhotos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHotelCountsByType = async (req, res) => {
  try {
    const counts = await Hotel.aggregate([
      { $group: { _id: '$type', count: { $sum: 1 } } },
    ]);
     // Tạo một mapping giữa thành phố và ảnh
     const typePhotos = {
      'hotel': 'https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=',
      'apartment': 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg',
      'resort': 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg',
      'villa' :'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg',
      'cabin' : 'https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg'
    };

    // Tạo một danh sách các thành phố bạn quan tâm
    const citiesOfInterest = ['hotel', 'apartment', 'resort','villa','cabin'];

    // Bổ sung các thành phố còn thiếu vào kết quả
    const resultWithPhotos = citiesOfInterest.map((type) => {
      const foundType = counts.find((typeInfo) => typeInfo._id === type);
      const count = foundType ? foundType.count : 0;
      const photo = typePhotos[type]; 

      return {
        type,
        count,
        photo,
      };
    });
    res.json(resultWithPhotos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopRatedHotels = async (req, res) => {
  try {
    const topRatedHotels = await Hotel.find().sort({ rating: -1 }).limit(3);
    res.json(topRatedHotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
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

module.exports = {
  getHotelCountsByCity,
  getHotelCountsByType,
  getTopRatedHotels,
  getAllHotels
};
