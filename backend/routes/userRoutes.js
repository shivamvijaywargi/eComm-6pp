const express = require('express');

const {
  registerUser,
  getUser,
  logout,
  forgotPassword,
} = require('../controllers/userController');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(getUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);

module.exports = router;
