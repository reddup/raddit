const express = require('express');
const postRoutes = express.Router();

const postController = require('../controllers/postController.js');

postRoutes.route('/')
  .get(postController.getAllPosts)
  .post(postController.addNewPost);

postRoutes.route('/:id')
  .get(postController.getOnePost)
  .put(postController.updateOnePost)
  .delete(postController.removeOnePost);

module.exports = postRoutes;