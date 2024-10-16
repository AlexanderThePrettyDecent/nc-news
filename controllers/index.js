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
const { getAllUsers } = require("./users.controllers");
module.exports = {
  getArticlesId,
  getAllTopics,
  getEndpoints,
  getAllArticles,
  getCommentsFromArticle,
  postCommentToArticle,
  patchArticleVotes,
  deleteCommentByID,
  getAllUsers,
};
