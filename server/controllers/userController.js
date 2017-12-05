const User = require('../models/User.js');
const db = require('../db');

const UserController = {};

/**
* Add User
* @requires userId - to be present in req.body
* @argument recent_post_id - optional in req.body
* @description - creates a new User and saves to DB
*/
UserController.addNewUser = (req, res, next) => {
  if (!req.body.userId) return res.status(400).send({err: 'Invalid request'});

  const newUser = new User(req.body.userId);

  const query = {
    text: "INSERT INTO \"Users\"(user_id, recent_post_id) VALUES($1, $2) RETURNING user_id",
    values: Object.values(newUser)
  };

  db.conn.one(query)
    .then(createdUser => {
      res.status(200).send({
        'msg' : 'user successfully created',
        'uid': createdUser.user_id
      })
    })
    .catch(err => res.status(404).send(err));
};

/**
* Get User
* @param {id} - required, varchar, unique
* @description - returns table row for matching user id param.  
*                returns 400 if user is not found.
*/
UserController.getOneUser = (req, res, next) => {
  if (!req.params.id) return res.status(400).send({err: 'Invalid request'});

  const query = {
    text: "SELECT * FROM \"Users\" WHERE user_id=$1",
    values: [req.params.id]
  };

  db.conn.one(query)
    .then(foundUser => res.status(200).send(foundUser))
    .catch(err => res.status(400).send(err));

};

/**
* Update User
*/
UserController.updateOneUser = (req, res, next) => {

};

/**
* Remove User
*/
UserController.removeOneUser = (req, res, next) => {

  const query = {
    text: "DELETE FROM \"Users\" WHERE user_id=$1",
    values: [req.params.id]
  };

  db.conn.any(query)
    .then(deletedUser => {
      res.status(200).send({
        'msg' : 'user successfully deleted'
      })
    })
    .catch(err => res.status(404).send(err));
};

module.exports = UserController;
