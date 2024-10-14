const express = require("express");
const { getEndpoints, getAllTopics, getArticlesId } = require("./controllers");
const { serverError, customError } = require("./errorHandlers");

const app = express();

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles/:article_id", getArticlesId);

app.use(customError);

app.use(serverError);

module.exports = app;
