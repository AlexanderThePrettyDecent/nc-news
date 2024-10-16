const db = require("../db/connection");

function selectArticlesId(articleID) {
  if (!/^[0-9]+$/.test(articleID)) {
    return Promise.reject({ status: 400, msg: "invalid id" });
  }
  return db
    .query(
      `SELECT * FROM articles
        WHERE article_id = ${articleID}`
    )
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return results.rows;
    });
}

function selectAllArticles() {
  return db
    .query(
      `
        SELECT
          articles.author,
          articles.title, 
          articles.article_id, 
          articles.topic, 
          articles.created_at, 
          articles.votes, 
          articles.article_img_url, 
          COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY created_at DESC`
    )
    .then((results) => {
      return results.rows;
    });
}

function selectCommentsFromArticle(articleID) {
  if (!/^[0-9]+$/.test(articleID)) {
    return Promise.reject({ status: 400, msg: "invalid id" });
  }
  return db
    .query(
      `SELECT * FROM comments
        WHERE article_id = ${articleID}
        ORDER BY created_at DESC`
    )
    .then((results) => {
      if (!selectArticlesId(articleID)) {
        return Promise.reject({ status: 404, msg: "not found" });
      }

      return results.rows;
    });
}

function insertCommentToArticle(articleID, requestBody) {
  if (!/^[0-9]+$/.test(articleID)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  return db
    .query(
      `INSERT INTO comments
      (author, body, article_id)
      VALUES
      ($1, $2, $3) RETURNING *`,
      [requestBody.username, requestBody.body, articleID]
    )
    .then((results) => {
      if (!selectArticlesId(articleID)) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return results.rows;
    });
}

function updateArticleVotes(articleID, requestBody) {
  if (!requestBody.inc_votes){
    return Promise.reject({ status: 400, msg: "bad request" })
  }
  return db
    .query(
      `UPDATE articles
      SET votes = votes + $1
      WHERE article_id = $2
      RETURNING *;`,
      [requestBody.inc_votes, articleID]
    )
    .then((results) => {
      if (!selectArticlesId(articleID)) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return results.rows;
    });
}

module.exports = {
  selectArticlesId,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
};
