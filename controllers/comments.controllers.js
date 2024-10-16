const { deleteComment } = require("../models");

function deleteCommentByID(request, response, next) {
  const commentID = request.params.comment_id;
  return deleteComment(commentID)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = { deleteCommentByID };
