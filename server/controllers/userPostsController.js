const UserPost = require('../models/UserPost.js');
const db = require('../db');


const UserPostsController = {};

/**
* Get all user's posts
*/
UserPostsController.getAllUserPosts = (req, res, next) => {
  if (!req.params.uid) return res.status(400).send('Invalid request');

  const query = {
    text: "SELECT u.user_id, p.post_id, p.title, p.link, p.metadata as post_metadata, up._id, up.metadata as user_post_metadata FROM \"UserPosts\" as up INNER JOIN \"Posts\" as p ON up.post_id=p.post_id INNER JOIN \"Users\" as u ON up.user_id=u.user_id WHERE up.user_id=$1;",
    values: [req.params.uid]
  };

  db.conn.any(query)
    .then(allUserPosts => res.status(200).send(allUserPosts))
    .catch(err => res.status(404).send(err));
};

/**
* Add one user post
*/
UserPostsController.addOneUserPost = (req, res, next) => {
  if (!req.params.uid || !req.body.postId || (req.body.metadata && !Array.isArray(req.body.metadata))) return res.status(400).send({ err: 'Invalid request' });

  const newUserPost = new UserPost(req.params.uid, req.body.postId, req.body.metadata);

  const query = {
    text: "INSERT INTO \"UserPosts\"(user_id, post_id, metadata) VALUES($1, $2, $3) RETURNING *",
    values: Object.values(newUserPost)
  };

  db.conn.one(query)
    .then(createdUserPost => {
      res.status(200).send({
        'msg': 'user post successfully created',
        createdUserPost
      })
    })
    .catch(err => res.status(404).send(err));
};

/**
* Get one user post
*/
UserPostsController.getOneUserPost = (req, res, next) => {
  if (!req.params.uid || !req.params.pid) return res.status(400).send({ err: 'Invalid request' });

  const query = {
    text: "SELECT u.user_id, p.post_id, p.title, p.link, p.metadata as post_metadata, up._id, up.metadata as user_post_metadata FROM \"UserPosts\" as up INNER JOIN \"Posts\" as p ON up.post_id=p.post_id INNER JOIN \"Users\" as u ON up.user_id=u.user_id WHERE up.user_id=$1 AND up.post_id=$2;",
    values: [req.params.uid, req.params.pid]
  };

  db.conn.one(query)
    .then(userPost => res.status(200).send(userPost))
    .catch(err => res.status(404).send(err));
};

/**
* Update one user post
*/
UserPostsController.updateOneUserPost = (req, res, next) => {
  if (!req.params.uid || !req.params.pid) return res.status(400).send({ err: 'Invalid request' });
  
  const updateUserPost = new UserPost(req.params.uid, req.params.pid, req.body.metadata);

  const query = {
    text: "UPDATE \"UserPosts\" SET metadata=$3 WHERE user_id=$1 AND post_id=$2 RETURNING *",
    values: Object.values(updateUserPost)
  };

  db.conn.one(query)
    .then(updatedUserPost => res.status(200).send(updatedUserPost))
    .catch(err => res.status(400).send(err));
};

/**
* Remove one user post
*/
UserPostsController.removeOneUserPost = (req, res, next) => {
  if (!req.params.uid || !req.params.pid) return res.status(400).send({ err: 'Invalid request' });

  const query = {
    text: "DELETE FROM \"UserPosts\" WHERE user_id=$1 AND post_id=$2",
    values: [req.params.uid, req.params.pid]
  };

  db.conn.any(query)
    .then(deletedUserPost => {
      res.status(200).send({
        'msg': 'user post successfully deleted'
      })
    })
    .catch(err => res.status(404).send(err));
};

module.exports = UserPostsController;
