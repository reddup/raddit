const express = require('express');
const userRoutes = express.Router();

const userController = require('../controllers/userController.js');
const userPostsController = require('../controllers/userPostsController.js');

userRoutes.route('/')
  .post(userController.addNewUser);

userRoutes.route('/:id')
  .get(userController.getOneUser)
  .put(userController.updateOneUser)
  .delete(userController.removeOneUser);

userRoutes.route('/:uid/posts')
  .get(userPostsController.getAllUserPosts)
  .post(userPostsController.addOneUserPost);

userRoutes.route('/:uid/posts/:pid')
  .get(userPostsController.getOneUserPost)
  .put(userPostsController.updateOneUserPost)
  .delete(userPostsController.removeOneUserPost);

module.exports = userRoutes;