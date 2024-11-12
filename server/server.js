// server.js
const app = require('./app');  // Import app.js where routes and middleware are set up
const dotenv = require('dotenv');
const mongoose = require('mongoose');  // MongoDB connection
const { errorHandler } = require('./utils/errorHandler');  // Optional: Global error handler for API
const { protect } = require('./middleware/authMiddleware');  // Optional: Authentication middleware

dotenv.config();  // Load environment variables from .env file

// Step 1: Set up global exception handling early
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  console.error(err.stack);
  process.exit(1);  // Exit the process to avoid running in an inconsistent state
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  console.error(err.stack);
  process.exit(1);  // Exit the process to avoid running in an inconsistent state
});

// Step 2: Connect to MongoDB (database connection)
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);  // Exit if DB connection fails
  }
};

// Step 3: Initialize the database connection
connectDB();

// Step 4: Initialize your app
const PORT = process.env.PORT || 5000;

// Step 5: Once DB connection is established, start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
