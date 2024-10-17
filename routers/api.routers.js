const { getEndpoints } = require("../controllers");

const apiRouter = require("express").Router();

apiRouter.route("/").get(getEndpoints);

module.exports = { apiRouter };
