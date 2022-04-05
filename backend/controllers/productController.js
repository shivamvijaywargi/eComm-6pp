const Product = require('../models/productModel');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const ApiFeatures = require('../utils/apiFeatures');

// Create Product -- ADMIN
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  // const { name, description, images, price, category } = req.body;

  // if (!name || !description || !images || !price || !category) {
  //   throw new Error('All the fields are required');
  // }

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// GET All Produc
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultsPerPage = 5;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultsPerPage);
  const products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

// UPDATE Single product
exports.updateSingleProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('Product not found', 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

// DELETE Single product -- ADMIN
exports.deleteSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(500).json({
      success: false,
      message: 'Product Not Found',
    });
  }

  await Product.remove();

  res.status(200).json({
    success: true,
    product,
  });
});

// GET Single product
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new Error('Product not found');
  }

  res.status(200).json({
    success: true,
    product,
  });
});
