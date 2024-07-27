const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const userRouter = require('./routes/userRoutes')
const imageRoutes = require('./routes/imageRoutes');
// const bookingRoutes = require('./routes/bookingRoutes');
const homeRoutes = require('./routes/homeRoutes');
const searchRoutes = require('./routes/searchRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRouter');
const roomRoutes = require('./routes/roomRoutes');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB;



// API Routes
app.use('/api', userRouter);
app.use('/api/images', imageRoutes);
// app.use('/api/bookings', bookingRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/hotel', hotelRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rooms', roomRoutes);

// Serve static assets (React build) in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
