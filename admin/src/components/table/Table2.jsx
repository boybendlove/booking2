import "./table.scss";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Paper from "@mui/material/Paper";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const List = () => {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/Transaction`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/getCustomers`);
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
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
        return { color: 'darkgreen', backgroundColor: 'lightcoral', borderRadius: '10px', border: 'none' };
      case 'Checkin':
        return { color: 'darkgreen', backgroundColor: 'lightgreen', borderRadius: '10px', border: 'none' };
      case 'Checkout':
        return { color: 'darkgreen', backgroundColor: 'lightblue', borderRadius: '10px', border: 'none' };
      default:
        return { color: 'darkgreen', borderRadius: '10px', border: 'none' };
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpen = (transaction) => {
    setCurrentTransaction(transaction);
    setNewStatus(transaction.status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = async () => {
    if (currentTransaction) {
      const transactionID = currentTransaction._id
      console.log("aaaa",currentTransaction)
      try {
        await axios.put(`http://localhost:5000/api/admin/Transaction/update/${transactionID}`, {
          status: newStatus,
        });
        setTransactions((prevTransactions) =>
          prevTransactions.map((transaction) =>
            transaction._id === currentTransaction._id
              ? { ...transaction, status: newStatus }
              : transaction
          )
        );
        handleClose();
      } catch (error) {
        console.error('Error updating transaction status:', error);
      }
    }
  };

  return (
    <div>
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
            {transactions && transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
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
                  <button style={getStatusStyle(row.status)} onClick={() => handleClickOpen(row)}>{row.status}</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Status</DialogTitle>
        <DialogContent>
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Checkin">Checkin</MenuItem>
            <MenuItem value="Checkout">Checkout</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleStatusChange}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default List;
