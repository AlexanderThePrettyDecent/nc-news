const getEndpoints = require("./api.controllers");
const {
  getArticlesId,
  getAllArticles,
  getCommentsFromArticle,
  postCommentToArticle,
  patchArticleVotes,
} = require("./articles.controllers");
const {
  deleteCommentByID,
  patchCommentVotes,
} = require("./comments.controllers");
const getAllTopics = require("./topics.controllers");
const { getAllUsers, getUserByUsername } = require("./users.controllers");
module.exports = {
  getArticlesId,
  getAllTopics,
  getEndpoints,
  getAllArticles,
  getCommentsFromArticle,
  postCommentToArticle,
  patchArticleVotes,
  getAllUsers,
  deleteCommentByID,
  getUserByUsername,
  patchCommentVotes,
};
