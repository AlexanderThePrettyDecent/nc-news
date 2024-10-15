function serverError(err, req, res, nest) {
  res.status(500).send({ error: err, msg: "internal server error" });
}

function customError(err, req, res, nest) {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
}

module.exports = { serverError, customError };
