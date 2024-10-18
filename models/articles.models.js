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

function totalArticleNumber(topic) {
  const insert = [];
  let where = " ";
  if (topic) {
    where = ` WHERE topic=$1`;
    insert.push(topic);
  }
  return db
    .query(
      `SELECT
        COUNT(article_id) AS total_count
      FROM articles
      ${where}`,
      insert
    )
    .then((results) => {
      return results.rows;
    });
}

function selectAllArticles(
  sortOrder = "DESC",
  sortBy = "created_at",
  topic,
  limit = 10,
  p = 1
) {
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

  return totalArticleNumber(topic)
    .then((totalCount) => {
      const total = Number(totalCount[0].total_count);
      if (Math.ceil(total / limit) < p) {
        p = Math.ceil(total / limit);
      }
      if (p < 1) {
        p = 1;
      }
      if (limit < 1) {
        limit = 10;
      }
      const offset = limit * (p - 1);
      const mainQuery = db.query(
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
            ORDER BY ${sortBy} ${sortOrder}
            LIMIT ${limit}
            OFFSET ${offset}`,
        insertArr
      );
      return Promise.all([mainQuery, totalCount]);
    })
    .then((results) => {
      if (results[0].rows.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      const totalCount = results[1][0].total_count;
      const articles = results[0].rows;
      const output = { articles: articles, total_count: totalCount };
      return output;
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

function insertArticle(requestBody) {
  let { author, topic, title, body, article_img_url } = requestBody;
  if (!author || !topic || !title || !body) {
    return Promise.reject({ status: 400, msg: "bad request" });
  }
  if (!article_img_url) {
    article_img_url =
      "https://static.wikia.nocookie.net/epicmeme/images/c/c4/JermaSus.png/revision/latest/scale-to-width-down/843?cb=20201230153850";
  }
  return db
    .query(
      `INSERT INTO articles
      (author, body, topic, article_img_url, title)
      VALUES
      ($1, $2, $3, $4, $5) RETURNING *`,
      [author, body, topic, article_img_url, title]
    )
    .then((results) => {
      results.rows[0].comment_count = 0;
      return results.rows;
    });
}

module.exports = {
  selectArticlesId,
  selectAllArticles,
  selectCommentsFromArticle,
  insertCommentToArticle,
  updateArticleVotes,
  insertArticle,
};
