const getEndpoints = require("./api.controllers");
const { getArticlesId, getAllArticles } = require("./articles.controllers");
const getAllTopics = require("./topics.controllers");
module.exports = { getArticlesId, getAllTopics, getEndpoints, getAllArticles };
