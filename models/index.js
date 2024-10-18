const {
  selectArticlesId,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
  insertArticle,
} = require("./articles.models");
const { deleteComment, updateCommentVotes } = require("./comments.models");
const { selectAllTopics } = require("./topics.models");
const { selectAllUsers, selectUsersUsername } = require("./users.models");
module.exports = {
  selectArticlesId,
  selectAllTopics,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
  deleteComment,
  selectAllUsers,
  selectUsersUsername,
  updateCommentVotes,
  insertArticle
};
