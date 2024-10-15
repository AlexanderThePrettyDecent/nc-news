const comments = require("../db/data/test-data/comments");
const {
  selectArticlesId,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
} = require("../models/index");

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
      response.status(200).send({ articles: results });
    })
    .catch((err) => {
      next(err);
    });
}

function getCommentsFromArticle(request, response, next) {
  const articleID = request.params.article_id;
  return selectCommentsFromArticle(articleID)
    .then((results) => {
      response.status(200).send({ comments: results });
    })
    .catch((err) => next(err));
}

function postCommentToArticle(request, response, next) {
  const articleID = request.params.article_id;
  const requestBody = request.body;
  return insertCommentToArticle(articleID, requestBody)
    .then((results) => {
      response.status(201).send({ comment: results[0] });
    })
    .catch((err) => {
      return next(err);
    });
}

function patchArticleVotes(request, response, next) {
  const articleID = request.params.article_id;
  const requestBody = request.body;
  return updateArticleVotes(articleID, requestBody)
    .then((results) => {
      response.status(200).send({ article: results[0] });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getArticlesId,
  getAllArticles,
  getCommentsFromArticle,
  postCommentToArticle,
  patchArticleVotes,
};
