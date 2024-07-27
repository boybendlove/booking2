import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import React, { useEffect, useState } from 'react';
import { useHotelSearchContext } from '../../components/searchItem/searchContext';
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import axios from 'axios';


const List = () => {
  const { searchCriteria } = useHotelSearchContext();
  const [searchResults, setSearchResults] = useState([]);
  localStorage.setItem('search', JSON.stringify(searchCriteria));
  useEffect(() => {
    const mockAPICall = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search/search_hotels?city=${searchCriteria.city}&startDate=${searchCriteria.startDate}&endDate=${searchCriteria.endDate}&numRooms=${searchCriteria.numRooms}&numPeople=${searchCriteria.numPeople}`);
        setSearchResults(response.data);

      } catch (error) {
        console.error('Error:', error);
      };
    };

    mockAPICall();
  }, [searchCriteria, setSearchResults]);
  console.log("tim kiem", searchCriteria)
  console.log("xin chào", searchResults)
  const { setSearchCriteria } = useHotelSearchContext();
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const handleInputChange = (name, value) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSearch = () => {
    const searchInput = {
      city: destination,
      startDate: format(date[0].startDate, "MM/dd/yyyy"),
      endDate: format(date[0].endDate, "MM/dd/yyyy"),
      numPeople: options.adult + options.children,
      numRooms: options.room,
    };
    setSearchCriteria(searchInput);
    // navigate("/hotels");
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adult}
                    onChange={(e) => handleInputChange('adult', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.children}
                    onChange={(e) => handleInputChange('children', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.room}
                    onChange={(e) => handleInputChange('room', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch}>Search</button>
          </div>
          <div className="listResult">
            {searchResults.map((hotel) => (
              <SearchItem
                key={hotel._id}
                title={hotel.title}
                address={hotel.address}
                availableRooms={hotel.availableRooms}
                cheapestPrice={hotel.cheapestPrice}
                city={hotel.city}
                desc={hotel.desc}
                distance={hotel.distance}
                name={hotel.name}
                photos={hotel.photos}
                rating={hotel.rating}
                type={hotel.type}
                featured={hotel.featured}
                id={hotel._id}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default List;
