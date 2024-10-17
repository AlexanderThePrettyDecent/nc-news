const { deleteCommentByID, patchCommentVotes } = require("../controllers");

const commentsRouter = require("express").Router();

commentsRouter
  .route("/:comment_id")
  .delete(deleteCommentByID)
  .patch(patchCommentVotes);

module.exports = { commentsRouter };
