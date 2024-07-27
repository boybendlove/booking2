import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Hotel = () => {
  const [hotel, setHotel] = useState(null);
  const { id } = useParams(); // Sử dụng useParams để lấy id từ URL
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const navigate = useNavigate();
  
  const search = JSON.parse(localStorage.getItem('search'));
  console.log(search)
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hotel/${id}`);
        setHotel(response.data);
        setPhotos(response.data.photos);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin khách sạn:', error);
      }
    };

    fetchHotel();
  }, [id]); // Sử dụng id trong useEffect
  console.log("sâsasas",hotel)
  if (!hotel) {
    return <div>Loading...</div>;
  }
  const startDate = new Date(search.startDate);
        const endDate = new Date(search.endDate);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
  console.log("startDate",startDate)
  console.log("endDate",endDate)
  console.log("SS",nights)
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };
  console.log(photos)
  const handleMove = (direction) => {
    if (photos.length === 0) {
      return; // Không có ảnh nào, không cần di chuyển
    }
  
    let newSlideNumber;
  
    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === photos.length - 1 ? 0 : slideNumber + 1;
    }
  
    setSlideNumber(newSlideNumber);
  };
  console.log("ss",slideNumber)
  console.log("hh",photos[slideNumber])

  const handleBookNow = () => {
    // Chuyển hướng sang trang Booking và truyền dữ liệu qua state
    navigate('/booking', {
      state: {
        hotel: hotel,
        startDate: startDate,
        endDate: endDate,
        nights: nights,
      },
    });
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)}
            />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")}
            />
            <div className="sliderWrapper">
              <img src={photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")}
            />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{hotel.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hotel.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over {hotel.cheapestPrice} at this property and get a {hotel.featured ? 'Free Taxi' : 'Free Bus'}
          </span>
          <div className="hotelImages">
            {photos.length > 0 ? (
              photos.map((photo, i) => (
                <div className="hotelImgWrapper" key={i}>
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="hotelImg"
                  />
                </div>
              ))
            ) : (
              <div>No photos available</div>
            )}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotel.title}</h1>
              <p className="hotelDesc">
                {hotel.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {nights}-night stay!</h1>
              <span>
                Located in the real heart of {hotel.city}, this property has an
                excellent location score of {hotel.distance}!
              </span>
              <h2>
                <b>${hotel.cheapestPrice*nights}</b> ({nights} nights)
              </h2>
              <button onClick={handleBookNow}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Hotel;
