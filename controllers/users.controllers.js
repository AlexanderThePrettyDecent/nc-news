const { selectAllUsers, selectUsersUsername } = require("../models");

function getAllUsers(request, response, next) {
  return selectAllUsers()
    .then((results) => {
      response.status(200).send({ users: results });
    })
    .catch((err) => next(err));
}

function getUserByUsername(request, response, next) {
  const username = request.params.username;
  return selectUsersUsername(username)
    .then((results) => {
      response.status(200).send({ user: results[0] });
    })
    .catch((err) => next(err));
}

module.exports = { getAllUsers, getUserByUsername };
