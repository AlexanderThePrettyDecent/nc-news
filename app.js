const express = require("express");
const { getAllTopics } = require("./controllers/topics.controllers");
const { serverError } = require("./errorHandlers");
const { getEndpoints } = require("./controllers/api.controllers");

const app = express();

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.use(serverError);

module.exports = app;
