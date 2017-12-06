const express = require('express');
const authRoutes = express.Router();

const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');

authRoutes.route('/login')
  .get(authController.verifyReddit);

authRoutes.route('/reddit')
  .get(authController.getTokenReddit, cookieController.setAuthCookies, authController.getRedditUser, userController.getOneUser, userController.addNewUser, (req, res) => res.redirect('/upvoted'));

module.exports = authRoutes;