const db = require("../db/connection");

function deleteComment(commentID) {
  return db.query(
    `DELETE FROM comments
      WHERE comment_id = $1
      RETURNING *;`,
    [commentID]
  );
}

function selectCommentById(commentID) {
  return db.query(
    `SELECT FROM comments
      WHERE comment_id = $1;`,
    [commentID]
  );
}

function updateCommentVotes(commentID, requestBody) {
  if (!requestBody.inc_votes) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  const incrementBy = requestBody.inc_votes;
  return db
    .query(
      `UPDATE comments
      SET votes = votes + $1
      WHERE comment_id = $2
      RETURNING *;`,
      [incrementBy, commentID]
    )
    .then((results) => {
      if (!selectCommentById(commentID)) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      console.log(results.rows[0]);
      return results.rows;
    });
}

module.exports = { deleteComment, updateCommentVotes };
