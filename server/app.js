
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoutes');  // Example route file for users
const authRoutes = require('./routes/authRoutes');  // Example route file for users
const studentRoutes = require('./routes/studentRoutes');  // Example route file for users
const userRoute= require('./routes/userRoute');  // Example route file for users
const { errorHandler } = require('./utils/errorHandler'); // Global error handling
const { protect } = require('./middleware/authMiddleware'); // Authentication middleware (if needed)
const cookieParser = require('cookie-parser');
const jobRoute = require('./routes/jobRoute')

// Initialize the express app
const app = express();


// Middleware setup
app.use(cors({
    origin: 'http://localhost:3000',  // The origin of your frontend
    credentials: true,  // Allow credentials (cookies) to be sent
}));  // Enable CORS for cross-origin requests (if needed)
app.use(morgan('dev'));  

// Middleware for parsing JSON in request body
app.use(cookieParser());
app.use(express.json()); 

// Define routes
app.use('/api/auth', authRoutes); 
app.use('/api/users',userRoute)
app.use('/api/',jobRoute)

// Catch-all route (Optional)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
// app.use(errorHandler);  // This should catch any unhandled errors

module.exports = app;  // Export the app for use in server.js
