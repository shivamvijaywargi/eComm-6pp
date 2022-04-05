const express = require('express');

const {
  getAllProducts,
  createProduct,
  updateSingleProduct,
  deleteSingleProduct,
  getSingleProduct,
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/products').get(isAuthenticatedUser, getAllProducts);
router
  .route('/product/new')
  .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router
  .route('/product/:id')
  .put(isAuthenticatedUser, authorizeRoles('admin'), updateSingleProduct)
  .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteSingleProduct)
  .get(getSingleProduct);

module.exports = router;
