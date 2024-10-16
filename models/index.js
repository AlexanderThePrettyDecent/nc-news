const {
  selectArticlesId,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
  deleteComment,
} = require("./articles.models");
const selectAllTopics = require("./topics.models");
const { selectAllUsers } = require("./users.models");
module.exports = {
  selectArticlesId,
  selectAllTopics,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
  deleteComment,
  selectAllUsers
};
