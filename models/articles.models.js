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
        if (results.rows.length === 0){return Promise.reject({ status: 404, msg: "not found" })}
      return results.rows;
    });
}

module.exports = selectArticlesId;
