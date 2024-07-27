import "./featuredProperties.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TP (props){ 
  return(
    <div className="fpItem">
    <img
      src={props.image}
      alt=""
      className="fpImg"
    />
    <span className="fpName"><a href="./hotels/0" target="_blank">{props.name}</a></span>
    <span className="fpCity">{props.city}</span>
    <span className="fpPrice">Starting from ${props.price}</span>
    <div className="fpRating">
      <button>{props.rate}</button>
      <span>Excellent</span>
    </div>
  </div>
  
  )

}
const FeaturedProperties = () => {
  const [hotelTopRatedHotels, setHotelTopRatedHotels] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseTopRate = await axios.get('http://localhost:5000/api/home/topRatedHotels');


        setHotelTopRatedHotels(responseTopRate.data);

      } catch (error) {
        console.error('Error fetching home data:', error.message);
      }
    };

    fetchData();
    
  }, []);
  console.log(hotelTopRatedHotels)
  return (
    <div className="featured">
      {hotelTopRatedHotels.map((item) => <TP key={item._id} city={item.city} name={item.name} price={item.cheapestPrice} image={item.photos[2]} rate={item.rating} />)}
  </div>
  );
};

export default FeaturedProperties;
