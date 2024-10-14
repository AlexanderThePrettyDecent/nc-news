const db = require("../db/connection");

function selectAllTopics() {
  return db.query(`SELECT slug, description FROM topics`).then((results) => {
    return results.rows;
  });
}

module.exports = selectAllTopics;
