import "./navbar.css"
import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ loggedIn, onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user"))
  const token = sessionStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);

  // Xử lý khi đăng nhập thành công
  const handleLogout = () => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
    setIsLoggedIn(false);
  };
  const handleTransactions = () => {
    navigate('/');
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <span ><Link to="/" className="logo">Booking Website</Link></span>
        
        <div className="navItems">
        {isLoggedIn === true ? (
          <>
           <Link to="/profile">{user.username}</Link>
           <button  onClick={handleTransactions}>Transactions</button>
           <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <button><Link to="/login">Login</Link></button>
            <button><Link to="/register">Register</Link></button>
          </>
        )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
