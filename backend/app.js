const express = require('express');
const cookieParser = require('cookie-parser');

const ErrorMiddleware = require('./middlewares/ErrorMiddleware');

const app = express();

// Express middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Route imports
const products = require('./routes/productRoute');
const users = require('./routes/userRoutes');

app.use('/api/v1', products);
app.use('/api/v1', users);

// Middleware for error
app.use(ErrorMiddleware);

module.exports = app;
