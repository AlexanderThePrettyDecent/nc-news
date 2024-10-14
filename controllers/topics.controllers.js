const { selectAllTopics } = require("../models/index");

function getAllTopics(request, response, next) {
  selectAllTopics()
    .then((results) => {
      response.status(200).send({ topics: results });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = getAllTopics;
