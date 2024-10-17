const { getAllUsers } = require("../controllers");

const usersRouter = require("express").Router();

usersRouter.route("/").get(getAllUsers);

module.exports = { usersRouter };
