const { selectAllUsers } = require("../models");

function getAllUsers(request, response, next) {
  return selectAllUsers()
    .then((results) => {
      response.status(200).send({ users: results });
    })
    .catch((err) => next(err));
}

module.exports = { getAllUsers };
