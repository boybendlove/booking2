// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Modal from 'react-bootstrap/Modal';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Thực hiện xác thực tài khoản ở phía backend
    // Nếu thành công, gọi onLogin và chuyển hướng đến trang chính
    // Nếu không thành công, hiển thị thông báo lỗi
    // Ví dụ sử dụng axios để gửi request đến API
    try {

      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      // const data = response.data;
      const user = {"user": response.data.user, "token" : response.data.token}
      // Xử lý khi đăng nhập thành công, ví dụ: lưu token vào localStorage
      sessionStorage.setItem("user", JSON.stringify(user.user)); // Lưu thông tin người dùng
      sessionStorage.setItem("token", user.token); // Lưu token
      onLogin(response.data);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header>
        <h2>Login</h2>
        </Modal.Header>
        <Modal.Body>
        <form>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleLogin}>Login</button>
      </form>
        </Modal.Body>
      </Modal.Dialog>
    </div>
      
      
    </div>
  );
}

export default Login;
