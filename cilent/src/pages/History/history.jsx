import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import React from 'react';
import { useState, useEffect } from "react";
import Footer from "../../components/footer/Footer";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { set } from "date-fns";
import Container from 'react-bootstrap/Container';
import MailList from "../../components/mailList/MailList";


function History (){
 const [products, setProduscts] = useState([]);
 const token = sessionStorage.getItem("token");
 const user = JSON.parse(sessionStorage.getItem("user"))
 console.log('a22222', user._id)

 useEffect (() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/transactions/view/${user._id}`)
            console.log('a2233333', response.data)
            setProduscts(response.data)
        } catch (error) {
            console.error('Lỗi khi lấy thông tin history từ server:', error);
          throw error; // Đưa ra ngoại lệ để có thể xử lý ở nơi gọi
        }
    }
    fetchData();
 }, [])
 console.log('asssas', products)
 const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${day}/${month}/${year}`;
};
const getStatusStyle = (status) => {
  switch (status) {
    case 'Booked':
      return { color: 'darkgreen', backgroundColor: 'lightcoral' };
    case 'Checkin':
      return { color: 'darkgreen', backgroundColor: 'lightgreen' };
    case 'Checkout':
      return { color: 'darkgreen', backgroundColor: 'lightblue' };
    default:
      return { color: 'darkgreen' };
  }
};

 return(
    <div>
        <Navbar></Navbar>
        {/* <Header></Header> */}
        <Container style={{marginTop: "15px", marginBottom: "20px"}}>
          <h2><b>Your Transactions</b></h2>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ backgroundColor: "#a6cee3" }}>#</th>
          <th style={{ backgroundColor: "#a6cee3" }}>Hotel</th>
          <th style={{ backgroundColor: "#a6cee3" }}>Room</th>
          <th style={{ backgroundColor: "#a6cee3" }}>Date</th>
          <th style={{ backgroundColor: "#a6cee3" }}>Price</th>
          <th style={{ backgroundColor: "#a6cee3" }}>Payment Method</th>
          <th style={{ backgroundColor: "#a6cee3" }}>Status</th>
        </tr>
      </thead>
      <tbody>
        {products && products.map( (product, index)=> (
          <tr key={index}>
          <td>{index + 1}</td>
          <td>{product.hotel}</td>
          <td>
              {product.rooms && Array.isArray(product.rooms) ? (
                product.rooms.map((room, index) => (
                  <span key={index}>
                    {room.roomNumbers && Array.isArray(room.roomNumbers) ? room.roomNumbers.join(', ') : ''}
                    {index < product.rooms.length - 1 ? ', ' : ''}
                  </span>
                ))
              ) : ''}
            </td>
            <td>{`${formatDate(product.dateStart)} - ${formatDate(product.dateEnd)}`}</td>
          <td>${product.price}</td>
          <td>{product.payment}</td>
          <td style={getStatusStyle(product.status)}>
                {product.status}
              </td>
        </tr>
        ))}
      </tbody>
    </Table>
    </Container>
    <MailList></MailList>
    <Footer></Footer>
    </div>
 )
}

export default History;