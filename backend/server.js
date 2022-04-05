require('dotenv').config({ path: 'backend/config/config.env' });

const app = require('./app');
const connectDB = require('./config/db');

// Handling uncaucght exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to uncaught exceptions');

  process.exit(1);
});

// Connecting to DB
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`App is listening at http://localhost:${process.env.PORT}`);
});

// Unhandled exceptions
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log('Shutting down the server due to unhandled promise rejections');

  server.close(() => {
    process.exit(1);
  });
});
