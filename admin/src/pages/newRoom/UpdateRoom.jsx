import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const UpdateRoom = () => {
    const { id } = useParams();
  const location = useLocation();
  const { rowToEdit } = location.state || {};
  const [info, setInfo] = useState(rowToEdit);
  const [hotelId, setHotelId] = useState(undefined);
  const [roomNumbers, setRoomNumbers] = useState(rowToEdit.roomNumbers || []);
  const [errors, setErrors] = useState({});

  const { data, loading, error } = useFetch("Hotels");

    console.log("in",info)
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSizeChange = (e) => {
    const { value } = e.target;
    const numbers = value.split(',').map((roomNumber) => roomNumber.trim());
    setRoomNumbers(numbers);
  };

  const validate = () => {
    const newErrors = {};
    if (!info.title) newErrors.title = "Title is required";
    if (!info.desc) newErrors.desc = "Description is required";
    if (!info.price) newErrors.price = "Price is required";
    if (!info.maxPeople) newErrors.maxPeople = "Max people is required";
    if (!roomNumbers.length) newErrors.roomNumbers = "Room numbers are required";
    if (!hotelId) newErrors.hotelId = "Hotel selection is required";
    return newErrors;
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const roomData = { ...info, roomNumbers, hotelId};
    console.log("roomData", roomData);

    try {
      await axios.put(`http://localhost:5000/api/admin/Room/update/${info._id}`, roomData);
      alert("Room successfully created!");
    } catch (err) {
      console.error("Error creating room:", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                    value={info[input.id] || ""}
                  />
                  {errors[input.id] && <span className="error">{errors[input.id]}</span>}
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  value={roomNumbers.join(',')}
                  onChange={handleSizeChange}
                  placeholder="Give comma-separated room numbers."
                />
                {errors.roomNumbers && <span className="error">{errors.roomNumbers}</span>}
              </div>
              <div className="formInput">
                <label>Choose a hotel</label>
                <select
                  id="hotelId"
                  onChange={(e) => setHotelId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((hotel) => (
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))}
                </select>
                {errors.hotelId && <span className="error">{errors.hotelId}</span>}
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;
