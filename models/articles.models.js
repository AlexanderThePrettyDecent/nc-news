const db = require("../db/connection");

function selectArticlesId(articleID) {
  return db
    .query(
      `SELECT
          articles.author,
          articles.title, 
          articles.article_id, 
          articles.topic, 
          articles.created_at, 
          articles.votes, 
          articles.article_img_url, 
          articles.body,
          COUNT(comments.comment_id) AS comment_count
        FROM articles
        LEFT JOIN comments ON articles.article_id = comments.article_id
        WHERE articles.article_id=$1
        GROUP BY articles.article_id`,
      [articleID]
    )
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return results.rows;
    });
}

function selectAllArticles(sortOrder = "DESC", sortBy = "created_at", topic) {
  const validOrders = ["ASC", "DESC"];
  const validSortBy = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  if (!validOrders.includes(sortOrder)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  if (!validSortBy.includes(sortBy)) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  if (!sortBy === "comment_count") {
    sortBy === `articles.${sortBy}`;
  }
  let where = ` `;
  const insertArr = [];
  if (topic) {
    where = " WHERE topic=$1 ";
    insertArr.push(topic);
  }
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
        ${where}
        GROUP BY articles.article_id
        ORDER BY ${sortBy} ${sortOrder}`,
      insertArr
    )
    .then((results) => {
      if (results.rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return results.rows;
    });
}

function selectCommentsFromArticle(articleID) {
  return db
    .query(
      `SELECT * FROM comments
        WHERE article_id = $1
        ORDER BY created_at DESC`,
      [articleID]
    )
    .then((results) => {
      if (!selectArticlesId(articleID)) {
        return Promise.reject({ status: 404, msg: "not found" });
      }

      return results.rows;
    });
}

function insertCommentToArticle(articleID, requestBody) {
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
  if (!requestBody.inc_votes) {
    return Promise.reject({ status: 400, msg: "bad request" });
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
