// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./Routes/authRoutes');
const todoRoutes = require('./Routes/todoRoutes');
const paymentRoutes = require('./Routes/paymentRoutes');


// DB Connection
connectDB();
// Load env variables
dotenv.config();

// App instance
const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true
}));
app.use(express.json());

// Routes
// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/payment', paymentRoutes);
app.get("/", (req, res) => {
  res.send("Yes, Server is up and running!🥳");
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
