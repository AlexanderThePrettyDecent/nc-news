# Northcoders News API

For instructions, please head over to [L2C NC News](https://l2c.northcoders.com/courses/be/nc-news).

This repo is the backend of a news website.
Users can create an account which allows them to view, create, comment on and vote for articles.

To use this repo:
-Clone this repo

---

dependencies:

body-parser:
$ npm install body-parser
minimum version: 1.20.3

dotEnv:
$ npm install dotenv --save
minimum version: 16.0.3

express:
$ npm install express
minimum version: 4.21.1

pg:
$ npm install pg

---

requires three .env files to work:
.env.test
.env.development
they should refer to the test and development databases respectively (PGDATABASE=_database_)

.env.production
should contain a variable DATABASE_URL=_url of hosted database_

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
