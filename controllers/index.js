const getEndpoints = require("./api.controllers");
const {
  getArticlesId,
  getAllArticles,
  getCommentsFromArticle,
  postCommentToArticle,
  patchArticleVotes,
  deleteCommentByID,
} = require("./articles.controllers");
const getAllTopics = require("./topics.controllers");
module.exports = {
  getArticlesId,
  getAllTopics,
  getEndpoints,
  getAllArticles,
  getCommentsFromArticle,
  postCommentToArticle,
  patchArticleVotes,
  deleteCommentByID
};
