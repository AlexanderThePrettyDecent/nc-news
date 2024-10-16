const {
  selectArticlesId,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
} = require("./articles.models");
const selectAllTopics = require("./topics.models");
module.exports = {
  selectArticlesId,
  selectAllTopics,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
};
