const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  console.log(token);

  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401));
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedToken.id);

  console.log(req.user);

  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};

module.exports = { isAuthenticatedUser, authorizeRoles };
