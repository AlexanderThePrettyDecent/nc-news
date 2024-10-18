const { response } = require("./app");

function serverError(error, request, response, next) {
  response.status(500).send({ error: error, msg: "internal server error" });
}

function customError(error, request, response, next) {
  if (error.status && error.msg) {
    response.status(error.status).send({ msg: error.msg });
  }
  next(error);
}

function psqlError(error, request, response, next) {
  if (
    error.code === "23502" ||
    error.code === "22003" ||
    error.code === "23503"
  ) {
    response.status(404).send({ msg: "not found" });
  } else if (error.code === "22P02") {
    response.status(400).send({ msg: "bad request" });
  } else next(error);
}

module.exports = { serverError, customError, psqlError };
