import "./propertyList.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function List (props) {
  return (
       <div className="pListItem">
        <img
          src={props.image}
          alt=""
          className="pListImg"
        />
        <div className="pListTitles">
          <h1>{props.name}s</h1>
          <h2>{props.count} hotels</h2>
        </div>
      </div>
      
  );
};
const PropertyList = () => {
  const [hotelCountsByType, setHotelCountsByType] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseType = await axios.get('http://localhost:5000/api/home/countsByType');


        setHotelCountsByType(responseType.data);

      } catch (error) {
        console.error('Error fetching home data:', error.message);
      }
    };

    fetchData();
    
  }, []);
  console.log(hotelCountsByType)
  return (
    <div className="pList">
      {hotelCountsByType.map((item) => <List name={item.type} count={item.count} image={item.photo} />)}
  </div>
  );
};
export default PropertyList; 