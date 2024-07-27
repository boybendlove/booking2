import React from 'react';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from 'react';
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import "./booking.css"
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { id } from 'date-fns/locale';

function BookingForm() {
  const navigate = useNavigate();
    const [openDate, setOpenDate] = useState(true);
    const location = useLocation();
    const [startDate, setStartDate] = useState(location.state.startDate);
    const [endDate, setEndDate] = useState(location.state.endDate);
    const [nights, setNights] = useState(location.state.nights);
    const hotel = location.state.hotel;
    const user = JSON.parse(sessionStorage.getItem("user"))
    const [rooms, setRooms] = useState([]); // State để lưu trữ thông tin phòng
    // console.log("hotel", hotel)
    const roomIds = hotel.rooms;
    // console.log("roomIds", roomIds)
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      phone: '',
      identityCardNumber: '',
      paymentMethod: 'Credit Card',
    });
    useEffect(() => {
      const fetchRooms = async () => {
          try {
              // Khởi tạo một mảng rỗng để chứa các promise
              const roomPromises = [];
  
              // Duyệt qua mỗi ID phòng và tạo một promise để lấy thông tin phòng từ server
              roomIds.forEach((roomId) => {
                  roomPromises.push(getRoomById(roomId));
              });
  
              // Sử dụng Promise.all để chờ tất cả các promise hoàn thành
              const roomsData = await Promise.all(roomPromises);
  
              // Cập nhật state rooms với thông tin phòng đã lấy được
              setRooms(roomsData);
          } catch (error) {
              console.error('Lỗi khi lấy thông tin phòng:', error);
          }
      };
  
      fetchRooms(); // Gọi hàm fetchRooms khi component mount hoặc khi roomIds thay đổi
  }, [roomIds]); // Dùng roomIds làm dependency để trigger useEffect khi roomIds thay đổi
  
  async function getRoomById(roomId) {
      try {
          // Thực hiện lấy thông tin phòng từ server dựa trên roomId
          const response = await axios.get(`http://localhost:5000/api/rooms/${roomId}`);
          return response.data;
      } catch (error) {
          console.error('Lỗi khi lấy thông tin phòng từ server:', error);
          throw error; // Đưa ra ngoại lệ để có thể xử lý ở nơi gọi
      }
  }
    console.log("rooms", rooms)
    const handleDateChange = (newDate) => {
      setStartDate(newDate.selection.startDate);
      setEndDate(newDate.selection.endDate);

      // Tính số đêm dựa trên ngày mới
      const timeDiff = newDate.selection.endDate.getTime() - newDate.selection.startDate.getTime();
      const newNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      setNights(newNights);
  };
    // Khai báo state để lưu số lượng phòng đã chọn
const [selectedRooms, setSelectedRooms] = useState([]);
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};
// Xử lý sự kiện khi checkbox thay đổi
const handleCheckboxChange = (_id, numbers) => {
  // console.log("Sssaaa",_id, numbers)
  // console.log("selectedRooms231", selectedRooms)
  // Tìm chỉ số của phòng có id tương ứng trong mảng selectedRooms
  const roomIndex = selectedRooms.findIndex(room => room._id === _id);
  console.log("roomIndex", roomIndex)
  // Nếu phòng đã được chọn
  if (roomIndex !== -1) {
      // const room = selectedRooms.find(room => room._id === _id);
      const room = selectedRooms[roomIndex];
      console.log("roomxxx", room);
      
      if (room.roomNumbers.some(number => number === numbers)) {
        // Tìm phòng có id tương ứng trong mảng selectedRooms
        room.roomNumbers = room.roomNumbers.filter(number => number !== numbers);
          // Loại bỏ phòng khỏi danh sách phòng đã chọn nếu không còn số phòng nào được chọn
          if (room.roomNumbers.length === 0) {
            selectedRooms.splice(roomIndex, 1);
            // console.log("selectedRooms", selectedRooms)
        }
        // console.log("selectedRoomseee22", selectedRooms)
        setSelectedRooms([...selectedRooms]);
      } else {
          // Cập nhật roomNumbers của phòng nếu vẫn còn số phòng được chọn

         
                room.roomNumbers.push(numbers)
                // console.log("updateRooms", room.roomNumbers.push(numbers))
                setSelectedRooms([...selectedRooms]);
          
          // setSelectedRooms(updatedSelectedRooms);
      }
  } else {
      // Nếu phòng chưa được chọn, thêm vào danh sách phòng đã chọn
      const newRoom = { _id, roomNumbers: [numbers] };
      const updatedSelectedRooms = [...selectedRooms, newRoom];
      console.log("updatedSelectedRooms", updatedSelectedRooms)
      setSelectedRooms(updatedSelectedRooms);
  }
};
// console.log("selectedRooms", selectedRooms)
// Tính tổng giá tiền đặt phòng tương ứng
const calculateTotalPrice = () => {
  let totalPrice = 0;
  // console.log("selectedRooms123111", selectedRooms.length, rooms.length )
   // Đảm bảo rằng selectedRooms và rooms không rỗng
   if (selectedRooms.length === 0 || rooms.length === 0) {
    console.log("aa")
    return totalPrice; // Trả về giá trị mặc định nếu không có dữ liệu
}
console.log("ab")
// Lặp qua danh sách các phòng đã chọn trong selectedRooms
selectedRooms.forEach(selectedRoom => {

    const room = rooms.find(room => room._id === selectedRoom._id);
    // console.log("roomsss", room)
    if (room && selectedRoom.roomNumbers && selectedRoom.roomNumbers.length > 0) {
        // Tính giá tiền cho từng phòng đã chọn
        const roomPrice = room.price * selectedRoom.roomNumbers.length * nights;
        totalPrice += roomPrice;
        // console.log("totalPrice", totalPrice)
    }
});
// console.log("totalPrice", totalPrice)
  return totalPrice;
};
console.log("calculateTotalPrice", calculateTotalPrice())

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("formData", formData)
  // Chuẩn bị dữ liệu đặt phòng để gửi lên server
  const bookingData = {
    userId: user._id,
    hotel: hotel.name,
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
    identityCardNumber: formData.identityCardNumber,
    rooms: selectedRooms, // Mảng các phòng đã chọn
    payment: formData.paymentMethod,
    dateStart: startDate,
    dateEnd: endDate,
    price: calculateTotalPrice(), // Tính tổng giá dựa trên các phòng đã chọn
  };
console.log("bookingData", bookingData)
  try {
    // Gửi yêu cầu API để đặt phòng
    const response = await axios.post('http://localhost:5000/api/transactions/reserve-room', bookingData);
    console.log('Đặt phòng thành công!', response.data);

    alert("đăt phòng thành công")
    navigate('/history')
  } catch (error) {
    console.error('Lỗi khi đặt phòng:', error);
    // Xử lý lỗi, hiển thị thông báo lỗi, v.v.
  }
};
    return (
      <div>
        <Navbar />
        {/* <Header/> */}
        <Container className="reservation-page">
        <Row>
        <Col sm={8}> 
        <h1>{hotel.name}</h1>
        <p>{hotel.title}</p>
        </Col>
        <Col className="booking-section" sm={4}>
          <h2>{hotel.cheapestPrice*nights} ({nights} nights)</h2>
          <button>Reserve or Book Now!</button>
        </Col>
        </Row>
        <form onSubmit={handleSubmit}>
        <Row>
        <Col className="lsItem" sm={4}>
              <h2>Check-in Date</h2>
              {/* <span >{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span> */}
              {openDate && (
                                <DateRange
                                onChange={(item) => handleDateChange(item)}
                                minDate={startDate} // Ngày bắt đầu tối thiểu là ngày hiện tại
                                ranges={[{ startDate: startDate, endDate: endDate, key: 'selection' }]}
                                />
                            )}
         </Col>
         <Col sm={1}></Col>
         <Col sm={7}>
          <h2>Reserve Info</h2>
          <label>Your Full Name: <input type="text" name="fullName"
          value={formData.fullName}
          onChange={handleInputChange} /></label>
          <label>Your Email: <input type="email" name="email"
          value={formData.email}
          onChange={handleInputChange} /></label>
          <label>Your Phone Number: <input type="tel" name="phone"
          value={formData.phone}
          onChange={handleInputChange}/></label>
          <label>Your Identity Card Number: <input type="text" name="identityCardNumber"
          value={formData.identityCardNumber}
          onChange={handleInputChange}/></label>
          </Col>
          </Row>
          <Row>
            <Row>
            <h2>Select Rooms</h2>
            </Row>
          <Row>
          {rooms && rooms.map(room => (
            <Col sm={5} key={room._id}>
              <Row>
                <Col className="room-option" sm={7} >          
                  <h3 style={{marginBottom: "0"}}>{room.title}</h3>
                  <p style={{marginBottom: "0"}}>{room.desc}</p>
                  <p style={{marginBottom: "0"}}>Max people: {room.maxPeople}</p>
                  <p style={{marginBottom: "0"}}>{room.price}</p>
                </Col>
                <Col  sm={5} style={{ paddingLeft: "0"}} >
                  <Row><p></p> </Row>
                  <Row>
                    {room.roomNumbers.map(numbers => (
                      <Col sm={2} style={{paddingRight: "0", paddingLeft: "0",textAlign:  'center',}}>
                        <label key={numbers} className='.room-chekbox'>
                          {numbers}
                          <Row>
                            <Col style={{ justifyContent:  'center'}}>
                              <input type="checkbox" value={numbers} onChange={() => handleCheckboxChange(room._id,numbers)} /> </Col>
                          </Row>
                        </label>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Col>
          ))}
         </Row>
          </Row>
          <Row>
          <h2>Total Bill: {calculateTotalPrice()}$</h2>
          </Row>
          <Row>
            <Col sm={4}>
          <label>Select Payment Method: 
          <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleInputChange}
        >
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
          <option value="PayPal">PayPal</option>
        </select>
          </label>
          </Col>
          <Col sm={1}></Col>
          <Col sm={2}>
          <label></label>
          <button type="submit">Reserve Now</button>
          </Col>
          </Row>
        </form>
      </Container>
      <MailList/>
      <Footer/>
      </div>
    );
  }


export default BookingForm;
