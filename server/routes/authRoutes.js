const express = require('express');
const authRoutes = express.Router();

const authController = require('../controllers/authController.js');
const userController = require('../controllers/userController.js');
const cookieController = require('../controllers/cookieController.js');
const sessionController = require('../controllers/sessionController.js');

authRoutes.route('/login')
  .get(authController.verifyReddit);

authRoutes.route('/reddit')
  .get(authController.getTokenReddit, cookieController.setAuthCookies, authController.getRedditUser, cookieController.setUserCookie, userController.findOrInsertUser, (req, res) => res.redirect('/saved'));

authRoutes.route('/saved')
  .get(sessionController.isLoggedIn, authController.getRedditUserSaved, (req, res) => res.redirect('/saved'));

module.exports = authRoutes;
