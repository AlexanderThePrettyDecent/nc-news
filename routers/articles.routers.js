const {
  patchArticleVotes,
  getArticlesId,
  getCommentsFromArticle,
  postCommentToArticle,
  getAllArticles,
} = require("../controllers");

const articlesRouter = require("express").Router();

articlesRouter.route("/").get(getAllArticles)

articlesRouter.route("/:article_id").get(getArticlesId).patch(patchArticleVotes);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsFromArticle)
  .post(postCommentToArticle);

module.exports = {articlesRouter};
