const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');


exports.checkUsername = async (req, res) =>{
  try {
    const { username } = req.body;

    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: 'Vui lòng cung cấp tên người dùng' });
    }

    // Find user by username in the database
    const user = await User.findOne({ username });

    if (user) {
      // Username already exists
      return res.status(200).json({ exists: true, message: 'Tên người dùng đã tồn tại' });
    } else {
      // Username does not exist
      return res.status(200).json({ exists: false, message: 'Tên người dùng có thể sử dụng' });
    }
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
}


// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Tên đăng nhập không tồn tại.' });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: 'Mật khẩu không đúng.' });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', {
      expiresIn: '1h', // Thời gian hiệu lực của token
    });

    res.status(200).json({token, user});
  } catch (error) {
    console.error('Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};



// Đăng ký
exports.register = async (req, res) => {
  try {
    const { username, password, fullName, phoneNumber, email } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại.' });
    }

    // Lưu mật khẩu dưới dạng văn bản thô
    const user = new User({ username, password, fullName, phoneNumber, email });

    await user.save();

    res.status(201).json({ message: 'Đăng ký thành công.' });
  } catch (error) {
    console.error('Lỗi đăng ký:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// // Đăng xuất (xóa token)
// router.post('/logout', (req, res) => {
//   // Điều này có thể được triển khai bằng cách xóa token khỏi client (local storage hoặc cookie)
//   res.status(200).json({ message: 'Đã đăng xuất.' });
// });

// module.exports = router;
