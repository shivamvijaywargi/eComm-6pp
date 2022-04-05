const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a product name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please enter a product description'],
  },
  price: {
    type: Number,
    required: [true, 'Please enter a product price'],
    maxlength: [8, 'Product price cannot exceed 8 characters'],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter product's category"],
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxlength: [5, 'Product stock cannot exceed 5 characters'],
    default: 1,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', productSchema);
