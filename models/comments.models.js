const db = require("../db/connection");

function deleteComment(commentID) {
  return db.query(
    `DELETE FROM comments
      WHERE comment_id = $1
      RETURNING *;`,
    [commentID]
  );
}

module.exports = { deleteComment };