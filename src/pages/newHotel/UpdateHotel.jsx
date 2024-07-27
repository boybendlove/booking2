import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const UpdateHotel = () => {
  const { id } = useParams();
  const location = useLocation();
  const { rowToEdit } = location.state || {};
  const [files, setFiles] = useState([]);
  const [info, setInfo] = useState(rowToEdit || {});
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch("/Room");
  const [uploadedPhotos, setUploadedPhotos] = useState(rowToEdit?.photos || []);
  const [fileNames, setFileNames] = useState([]);
  const [errors, setErrors] = useState({});
  console.log("id",id)
  console.log("infoid",info._id)
  useEffect(() => {
    if (data) {
      setSelectedRooms(data.map((room) => ({
        ...room,
        selected: rowToEdit?.rooms?.includes(room._id) || false
      })));
    }
  }, [data, rowToEdit]);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.id]: e.target.value });
  };
  console.log("selectedRooms",selectedRooms)
  const handleSelect = (roomId) => {
    setSelectedRooms((prevRooms) =>
      prevRooms.map((room) =>
        room._id === roomId ? { ...room, selected: !room.selected } : room
      )
    );
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    const names = selectedFiles.map((file) => file.name);
    setFileNames(names);
  };

  const handleRemoveFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFileNames((prevNames) => prevNames.filter((_, i) => i !== index));
  };

  const handleRemoveUploadedPhoto = (index) => {
    setUploadedPhotos((prevPhotos) =>
      prevPhotos.filter((_, i) => i !== index)
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!info.name) newErrors.name = "Name is required";
    if (!info.type) newErrors.type = "Type is required";
    if (!info.city) newErrors.city = "City is required";
    if (!info.address) newErrors.address = "Address is required";
    if (!info.distance) newErrors.distance = "Distance is required";
    if (!info.title) newErrors.title = "Title is required";
    if (!info.desc) newErrors.desc = "Description is required";
    if (!info.cheapestPrice) newErrors.cheapestPrice = "Cheapest Price is required";
    if (!selectedRooms.some((room) => room.selected)) newErrors.rooms = "At least one room must be selected";
    if (files.length === 0 && uploadedPhotos.length === 0) newErrors.files = "At least one photo is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatedPhotos = [...uploadedPhotos];

      for (const file of files) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "zyyr22vm");
          formData.append("cloud_name", "derrbbxue");

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/derrbbxue/image/upload`,
            formData
          );
          const uploadedPhotoURL = response.data.secure_url;
          updatedPhotos.push(uploadedPhotoURL);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }

      const newHotel = {
        ...info,
        rooms: selectedRooms
          .filter((room) => room.selected)
          .map((room) => room._id),
        photos: updatedPhotos,
      };
      
      await axios.put(
        `http://localhost:5000/api/admin/Hotels/update/${info._id}`,
        newHotel
      );
      alert("Hotel successfully updated!");
    } catch (error) {
      console.error("Error uploading photos or updating hotel:", error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {uploadedPhotos.map((photo, index) => (
              <div key={index} className="photoContainer">
                <img src={photo} alt={`Uploaded ${index + 1}`} />
                <button onClick={() => handleRemoveUploadedPhoto(index)}>x</button>
              </div>
            ))}
            {files.map((file, index) => (
              <div key={index} className="photoContainer">
                <img src={URL.createObjectURL(file)} alt={`Uploaded ${index + 1}`} />
                <button onClick={() => handleRemoveFile(index)}>x</button>
              </div>
            ))}
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              {hotelInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={info[input.id] || ""}
                  />
                  {errors[input.id] && <span className="error">{errors[input.id]}</span>}
                </div>
              ))}
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <div className="fileNamesContainer">
                  {fileNames.map((name, index) => (
                    <div key={index} className="fileNameItem">
                      {name}
                    </div>
                  ))}
                </div>
              </div>
              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange} value={info.featured || ""}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple>
                  {loading ? (
                    <option>Loading...</option>
                  ) : (
                    selectedRooms.map((room) => (
                      <option
                        key={room._id}
                        value={room._id}
                        onClick={() => handleSelect(room._id)}
                        className={room.selected ? "selected" : ""}
                      >
                        {room.title}
                      </option>
                    ))
                  )}
                </select>
                {errors.rooms && <span className="error">{errors.rooms}</span>}
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateHotel;
