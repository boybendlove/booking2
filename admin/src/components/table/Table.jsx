import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const List = () => {
  const [customers,setCustomers] = useState ()
  const [transactions,setTransactions] = useState()
  useEffect(() => {
    const fetchData = async () => {
       try {

           const response = await axios.get(`http://localhost:5000/api/admin/Transaction`, {
              //  headers: {
              //      Authorization: `Bearer ${token}`,
              //      'x-refresh-token': refreshToken
              //  }
           });
           const sortedTransactions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const recentTransactions = sortedTransactions.slice(0, 8);

            setTransactions(recentTransactions);

       } catch (error) {
           console.error('Error fetching products:', error);
       } 
   };

   fetchData();
}, []);
useEffect(() => {
  const fetchProducts = async () => {
      try {
          const response = await axios.get(`http://localhost:5000/api/admin/getCustomers`, {
              // headers: {
              //     Authorization: `Bearer ${token}`,
              //     'x-refresh-token': refreshToken
              // }
          });
          setCustomers(response.data);
      } catch (error) {
          console.error('Error fetching products:', error);
      }
  };
  fetchProducts();
}, []);
const getUserNameById = (id) => {
  if (!customers || customers.length === 0) {
      return 'Unknown User';
  }
  const user = customers.find(customer => customer._id === id);
  return user ? user.username : 'Unknown User';
};
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
          return { color: 'darkgreen', backgroundColor: 'lightcoral', display: 'inline' };
      case 'Checkin':
          return { color: 'darkgreen', backgroundColor: 'lightgreen', display: 'inline' };
      case 'Checkout':
          return { color: 'darkgreen', backgroundColor: 'lightblue', display: 'inline' };
      default:
          return { color: 'darkgreen', display: 'inline' };
  }
};

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="tableCell"><input type="checkbox"></input></TableCell>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Hotel</TableCell>
            <TableCell className="tableCell">Room</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions && transactions.map((row) => (
            <TableRow key={row._id}>
              <TableCell className="tableCell"><input type="checkbox"></input></TableCell>
              <TableCell className="tableCell">{row._id}</TableCell>
              <TableCell className="tableCell">{getUserNameById(row.user)}</TableCell>
              <TableCell className="tableCell">{row.hotel}</TableCell>
              <TableCell className="tableCell">{row.rooms && Array.isArray(row.rooms) ? (
                                                row.rooms.map((room, index) => (
                                                <span key={index}>
                                                    {room.roomNumbers && Array.isArray(room.roomNumbers) ? room.roomNumbers.join(', ') : ''}
                                                    {index < row.rooms.length - 1 ? ', ' : ''}
                                                </span>
                                                ))
                                            ) : ''}</TableCell>
              <TableCell className="tableCell">{`${formatDate(row.dateStart)} - ${formatDate(row.dateEnd)}`}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className="tableCell">{row.payment}</TableCell>
              <TableCell className="tableCell">
                <button style={{...getStatusStyle(row.status), borderRadius: '10px', border: 'none', }} > {row.status}</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
