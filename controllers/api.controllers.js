const { openEndpoints } = require("../models/api.models");
const endpoints = require("../endpoints.json");

function getEndpoints(request, response) {
  response.status(200).send({ endpoints });
}

module.exports = { getEndpoints };
