const db = require("../db/connection");

function selectAllUsers() {
  return db
    .query("SELECT username, name, avatar_url FROM users;")
    .then((results) => {
      return results.rows;
    });
}

function selectUsersUsername(username) {
  return db
    .query("SELECT username, name, avatar_url FROM users WHERE username = $1", [
      username,
    ])
    .then((results) => {
      if (!results.rows.length) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      return results.rows;
    });
}

module.exports = { selectAllUsers, selectUsersUsername };
