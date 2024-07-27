import "./featured.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TP (props){ 
  return(
    <div className="featuredItem">
        <img
          src = {props.image}
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>{props.name}</h1>
          <h2>{props.count} properties</h2>
        </div>
      </div>
  
  )

}
const Featured = () => {
  const [hotelCountsByCity, setHotelCountsByCity] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCity = await axios.get('http://localhost:5000/api/home/countsByCity');


        setHotelCountsByCity(responseCity.data);

      } catch (error) {
        console.error('Error fetching home data:', error.message);
      }
    };

    fetchData();
    
  }, []);
  console.log(hotelCountsByCity)
  return (
    <div className="featured">
      {hotelCountsByCity.map((item) => <TP name={item.city} count={item.count} image={item.photo} />)}
  </div>
  );
};

export default Featured;
