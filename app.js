const express = require("express");
const {
  getEndpoints,
  getAllTopics,
  getArticlesId,
  getAllArticles,
  getCommentsFromArticle,
  postCommentToArticle,
  patchArticleVotes,
  deleteCommentByID,
  getAllUsers,
} = require("./controllers");
const { serverError, customError, psqlError } = require("./errorHandlers");
require;

const app = express();

app.use(express.json());

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticlesId);

app.get("/api/articles", getAllArticles);

app.get("/api/articles/:article_id/comments", getCommentsFromArticle);

app.post("/api/articles/:article_id/comments", postCommentToArticle);

app.patch("/api/articles/:article_id", patchArticleVotes);

app.delete("/api/comments/:comment_id", deleteCommentByID);

app.get("/api/users", getAllUsers)

app.use(customError);

app.use(psqlError);

app.use(serverError);

module.exports = app;
