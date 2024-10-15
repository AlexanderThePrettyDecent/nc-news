const { selectArticlesId, selectAllArticles } = require("../models/index");

function getArticlesId(request, response, next) {
  const articleID = request.params.article_id;
  return selectArticlesId(articleID)
    .then((results) => {
      response.status(200).send({ article: results[0] });
    })
    .catch((err) => next(err));
}

function getAllArticles(request, response, next) {
  return selectAllArticles()
    .then((results) => {
      response.status(200).send({ articles: results});
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticlesId, getAllArticles };
