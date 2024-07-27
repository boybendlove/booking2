import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Widget = ({ type }) => {
  let data;

  

  const [userCount, setUserCount] = useState([]);
  const [transactionCount, setTransactionCount] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState([]);
  const [averageMonthlyRevenue, setAverageMonthlyRevenue] = useState([]);
  
  
useEffect(() => {
    const fetchData = async () => {
       try {
           const response = await axios.get(`http://localhost:5000/api/admin/userCount`, {
              //  headers: {
              //      Authorization: `Bearer ${token}`,
              //      'x-refresh-token': refreshToken
              //  }
           });
           setUserCount(response.data)
       } catch (error) {
           console.error('Error fetching products:', error);
       } 
   };

   fetchData();
}, []);
useEffect(() => {
const fetchData = async () => {
   try {
       const response = await axios.get(`http://localhost:5000/api/admin/transactionCount`, {
          //  headers: {
          //      Authorization: `Bearer ${token}`,
          //      'x-refresh-token': refreshToken
          //  }
       });
       setTransactionCount(response.data)
   } catch (error) {
       console.error('Error fetching products:', error);
   } 
};

fetchData();
}, []);
useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/admin/totalRevenue`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //     'x-refresh-token': refreshToken
            // }
        });
        setTotalRevenue(response.data)
    } catch (error) {
        console.error('Error fetching products:', error);
    } 
};

fetchData();
}, []);
useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/admin/averageMonthlyRevenue`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //     'x-refresh-token': refreshToken
            // }
        });
        setAverageMonthlyRevenue(response.data)
    } catch (error) {
        console.error('Error fetching products:', error);
    } 
};

fetchData();
}, []);
useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/admin/averageMonthlyRevenue`, {
            // headers: {
            //     Authorization: `Bearer ${token}`,
            //     'x-refresh-token': refreshToken
            // }
        });
        setAverageMonthlyRevenue(response.data)
    } catch (error) {
        console.error('Error fetching products:', error);
    } 
};

fetchData();
}, []);

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.title === "USERS" ? userCount : data.title === "ORDERS" ? transactionCount : data.title === "EARNINGS" ? totalRevenue : averageMonthlyRevenue}
        </span>
        <span className="link"></span>
      </div>
      <div className="right">
        <div className="percentage positive">
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
