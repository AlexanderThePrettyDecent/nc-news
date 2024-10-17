const { deleteComment, updateCommentVotes } = require("../models");

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

function patchCommentVotes(request, response, next) {
  const commentID = request.params.comment_id;
  const requestBody = request.body;
  
  return updateCommentVotes(commentID, requestBody)
    .then((results) => {
      response.status(200).send({ comment: results[0] });
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = { deleteCommentByID, patchCommentVotes };
