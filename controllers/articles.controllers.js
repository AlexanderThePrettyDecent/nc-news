const { selectArticlesId } = require("../models/index");

function getArticlesId(request, response, next) {
  const articleID = request.params.article_id;
  return selectArticlesId(articleID)
    .then((results) => {
      response.status(200).send({ article: results[0] });
    })
    .catch((err) => next(err));
}

module.exports = getArticlesId;
