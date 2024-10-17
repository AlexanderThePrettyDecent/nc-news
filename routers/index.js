const { apiRouter } = require("./api.routers");
const { articlesRouter } = require("./articles.routers");
const { topicsRouter } = require("./topics.routers");
const { usersRouter } = require("./users.routers");

module.exports = { articlesRouter, apiRouter, usersRouter, topicsRouter };
