// Register.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios để gửi các yêu cầu API
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // Gửi yêu cầu API để kiểm tra xem tên người dùng đã tồn tại hay chưa
      // Bạn cần thay thế '/api/check-username' bằng đường dẫn API thực tế của bạn
      const usernameCheckResponse = await axios.post('http://localhost:5000/api/check-username', { username });

      // Nếu tên người dùng có sẵn, tiến hành đăng ký
      if (usernameCheckResponse.data.available) {
        // Gửi yêu cầu API để đăng ký người dùng
        // Bạn cần thay thế '/api/register' bằng đường dẫn API thực tế của bạn
        const registerResponse = await axios.post('http://localhost:5000/api/register', {
          username,
          password,
          // fullName,
          // phoneNumber,
          // email,
        });

        // Kiểm tra xem quá trình đăng ký có thành công hay không
        if (registerResponse.data.success) {
          // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
          navigate('/login');
        } else {
          // Xử lý khi quá trình đăng ký thất bại, hiển thị thông báo lỗi hoặc thực hiện hành động phù hợp
          console.error('Đăng ký thất bại:', registerResponse.data.message);
        }
      } else {
        // Xử lý trường hợp tên người dùng đã tồn tại
        console.error('Tên người dùng đã tồn tại.');
      }
    } catch (error) {
      // Xử lý bất kỳ lỗi nào có thể xảy ra trong quá trình đăng ký
      console.error('Đăng ký thất bại:', error.message);
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form>
        {/* Các trường nhập thông tin cho quá trình đăng ký người dùng */}
        <div>
          <label>Tên người dùng:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Mật khẩu:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* <div>
          <label>Họ và tên:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
        </div>
        <div>
          <label>Số điện thoại:</label>
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div> */}
        <button type="button" onClick={handleRegister}>
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default Register;
