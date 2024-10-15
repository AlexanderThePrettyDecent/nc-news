const { selectArticlesId, selectAllArticles, selectCommentsFromArticle } = require("./articles.models");
const selectAllTopics = require("./topics.models");
module.exports = { selectArticlesId, selectAllTopics, selectAllArticles, selectCommentsFromArticle };
