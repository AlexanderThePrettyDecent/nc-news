function serverError(err, req, res, nest) {
  res.status(500).send({ error: err, msg: "internal server error" });
}

module.exports = { serverError };
