const express = require("express");
const {
  getEndpoints,
  getAllTopics,
  getArticlesId,
  getAllArticles,
  getCommentsFromArticle,
} = require("./controllers");
const { serverError, customError } = require("./errorHandlers");

const app = express();

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticlesId);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getCommentsFromArticle);

app.use(customError);

app.use(serverError);

module.exports = app;
