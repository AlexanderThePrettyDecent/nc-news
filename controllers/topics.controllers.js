const { selectAllTopics } = require("../models/topics.models");

function getAllTopics(request, response, next) {
  selectAllTopics().then((results) => {
    response.status(200).send({ topics: results });
  });
}

module.exports = { getAllTopics };
