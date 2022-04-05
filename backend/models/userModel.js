const crypto = require('crypto');

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxlength: [30, 'Name cannot exceed 30 characters'],
    minlength: [4, 'Name cannot be less than 4 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: true,
    validate: [validator.isEmail, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minlength: [8, 'Password should contain at least 8 characters'],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
});

// Hashing / encrypting password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
};

// Compare password
userSchema.methods.comparePassword = async function (userSendPassword) {
  return await bcrypt.compare(userSendPassword, this.password);
};

// Generating password reset token
userSchema.methods.generatePasswordResetToken = function () {
  // Generating token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hashing and adding resetPasswordToken to schema
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);
