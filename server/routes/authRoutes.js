const express = require('express');
const authRoutes = express.Router();

const authController = require('../controllers/authController.js');

authRoutes.route('/login')
  .get(authController.verifyReddit);

authRoutes.route('/reddit')
  .get(authController.getTokenReddit);

module.exports = authRoutes;