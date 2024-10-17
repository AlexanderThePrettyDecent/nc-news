const express = require("express");
const { serverError, customError, psqlError } = require("./errorHandlers");
const {
  articlesRouter,
  apiRouter,
  usersRouter,
  topicsRouter,
} = require("./routers");
const { commentsRouter } = require("./routers/comments.routers");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use("/api/topics", topicsRouter);

app.use("/api/articles", articlesRouter);

app.use("/api/comments", commentsRouter);

app.use("/api/users", usersRouter);

app.use(customError);

app.use(psqlError);

app.use(serverError);

module.exports = app;
