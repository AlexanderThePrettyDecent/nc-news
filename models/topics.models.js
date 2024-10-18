const db = require("../db/connection");

function selectAllTopics() {
  return db.query(`SELECT slug, description FROM topics`).then((results) => {
    return results.rows;
  });
}

function selectTopicBySlug(slug) {
  return db
    .query(`SELECT slug, description FROM topics WHERE slug = $1`, [slug])
    .then((results) => {
      return results.rows;
    });
}

module.exports = { selectAllTopics, selectTopicBySlug };
