const {
  selectArticlesId,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
} = require("./articles.models");
const selectAllTopics = require("./topics.models");
module.exports = {
  selectArticlesId,
  selectAllTopics,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
};
