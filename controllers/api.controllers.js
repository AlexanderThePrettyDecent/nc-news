const { openEndpoints } = require("../models/api.models");

function getEndpoints(request, response) {
  //   return openEndpoints().then((results) => {
  //     console.log(results);
  response.status(200).send({ endpoints: openEndpoints() });
  //});
}

module.exports = { getEndpoints };
