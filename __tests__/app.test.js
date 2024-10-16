const request = require("supertest");
const db = require("../db/data/test-data");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const connection = require("../db/connection.js");
const endpoints = require("../endpoints.json");
require("jest-sorted");

beforeAll(() => {
  return seed(data);
});
afterAll(() => {
  return connection.end();
});

describe("/api", () => {
  describe("GET-/api", () => {
    test("200-endpoint responds with endpoints doc", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((results) => {
          expect(results.body.endpoints).toEqual(endpoints);
        });
    });
  });
});

describe("api/topics", () => {
  describe("GET - api/topics", () => {
    test("200-endpoint responds with 200 status and an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          const topics = response.body.topics;
          expect(response.body.topics.length).toBe(3);
          topics.forEach((topic) => {
            expect(topic).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
});

describe("/api/articles", () => {
  describe("GET-/api/articles/:article_id", () => {
    test("200-endpoint responds with full article of the ID specified", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((results) => {
          expect(results.body.article).toEqual({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("400-endpoint responds 'invalid id' if the parameter is not a valid ID(number)", () => {
      return request(app)
        .get("/api/articles/orange")
        .expect(400)
        .then((results) => {
          expect(results.body.msg).toBe("bad request");
        });
    });
    test("404-endpoint responds 'not found' if the parameter is a valid ID for a non-existant article", () => {
      return request(app)
        .get("/api/articles/555555555555")
        .expect(404)
        .then((results) => {
          expect(results.body.msg).toBe("not found");
        });
    });
  });
  describe("GET-/api/articles", () => {

    describe("200-endpoint responds with an array of article objects", () => {
      test("array includes the correct number of objects of the correct format, i.e excluding body (ignoring comment_count)", () => {
        return request(app)
          .get("/api/articles/")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles;
            expect(articles.length).toBe(13);
            articles.forEach((article) => {
              expect(article.body).toBeFalsy();
              expect(article).toMatchObject({
                author: expect.any(String),
                title: expect.any(String),
                article_id: expect.any(Number),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String),
                comment_count: expect.any(String),
              });
            });
          });
      });
      test("array of articles is sorted by date in descending order by default", () => {
        return request(app)
          .get("/api/articles/")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles;
            expect(articles).toBeSorted({
              key: "created_at",
              descending: true,
            });
          });
      });
      test("array of articles is sorted in the order specified in the query", () => {
        return request(app)
          .get("/api/articles/?sort_order=ASC")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles;
            expect(articles).toBeSorted({
              key: "created_at",
              descending: false,
            });
          });
      });
      test("array of articles is by the column specified in the query", () => {
        return request(app)
          .get("/api/articles/?sort_order=ASC&sort_by=comment_count")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles;
            expect(articles).toBeSorted({
              key: "comment_count",
              descending: false,
              coerce: true
            });
          });
      });
    test("400-endpoint responds with 'bad request' if queried order is invalid",()=>{
      return request(app)
          .get("/api/articles/?sort_order=EATMYSHORTS")
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("bad request")
          });
    });
    test("400-endpoint responds with 'bad request' if queried sort column is invalid",()=>{
      return request(app)
          .get("/api/articles/?sort_order=DESC%sort_by=salmon")
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe("bad request")
          });
    })
    });
  });
  describe("GET-/api/articles/:article_id/comments", () => {
    test("200-endpoint responds with an array of comment objects from the specified  ordered from newest to oldest", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then((response) => {
          const comments = response.body.comments;
          //console.log(comments)
          expect(response.body.comments.length).toBe(11);
          expect(comments).toBeSorted({
            key: "created_at",
            descending: true,
          });
          comments.forEach((comment) => {
            expect(comment).toMatchObject({
              comment_id: expect.any(Number),
              votes: expect.any(Number),
              created_at: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              article_id: expect.any(Number),
            });
          });
        });
    });
    test("200-endpoint responds with an empty array if specified article exists but has no comments", () => {
      return request(app)
        .get("/api/articles/7/comments")
        .expect(200)
        .then((response) => {
          const comments = response.body.comments;
          expect(comments.length).toBe(0);
          expect(Array.isArray(comments)).toBe(true);
        });
    });
    test("400-endpoint responds 'bad request' if the parameter is not a valid ID(number)", () => {
      return request(app)
        .get("/api/articles/orange/comments")
        .expect(400)
        .then((results) => {
          expect(results.body.msg).toBe("bad request");
        });
    });
    test("404-endpoint responds 'not found' if the parameter is a valid ID for a non-existant article", () => {
      return request(app)
        .get("/api/articles/555555555555")
        .expect(404)
        .then((results) => {
          expect(results.body.msg).toBe("not found");
        });
    });
  });
  describe("POST-/api/articles/:article_id/comments", () => {
    test("201-endpoint accepts a body containing a username and comment body, adds an entry to the comments table and responds with the newly added comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "butter_bridge",
          body: "It hasn't got better",
        })
        .expect(201)
        .then((results) => {
          expect(results.body.comment).toMatchObject({
            comment_id: 19,
            body: "It hasn't got better",
            votes: 0,
            author: "butter_bridge",
            article_id: 1,
            created_at: expect.any(String),
          });
        });
    });
    test("404-endpoint responds with 'not found' if specified user is non-existant", () => {
      const requestBody = {
        username: "bobby botox",
        commentBody: "It hasn't got better",
      };
      return request(app)
        .post("/api/articles/1/comments")
        .send(requestBody)
        .expect(404)
        .then((results) => {
          expect(results.body.msg).toBe("not found");
        });
    });
    test("404-endpoint responds with 'not found' if specified article is non-existant", () => {
      const requestBody = {
        username: "butter_bridge",
        commentBody: "It hasn't got better",
      };
      return request(app)
        .post("/api/articles/10000000/comments")
        .send(requestBody)
        .expect(404)
        .then((results) => {
          expect(results.body.msg).toBe("not found");
        });
    });
    test("400-endpoint responds with 'bad request' article id is not valid", () => {
      const requestBody = {
        username: "butter_bridge",
        commentBody: "It hasn't got better",
      };
      return request(app)
        .post("/api/articles/notanarticle/comments")
        .send(requestBody)
        .expect(400)
        .then((results) => {
          expect(results.body.msg).toBe("bad request");
        });
    });
  });
  describe("PATCH-api/articles/:article_id", () => {
    test("200-endpoint increases/decreases vote count of specified article by the quantity included in the request body", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then((results) => {
          expect(results.body.article).toMatchObject({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 101,
            article_img_url:
              "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
          });
        });
    });
    test("400-endpoint responds with 'bad request' when vote amount is not valid", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "cat" })
        .expect(400)
        .then((results) => {
          expect(results.body.msg).toBe("bad request");
        });
    });
    test("400-endpoint responds with 'bad request' when article ID is not valid", () => {
      return request(app)
        .patch("/api/articles/ARRRGGGG")
        .send({ inc_votes: 1 })
        .expect(400)
        .then((results) => {
          expect(results.body.msg).toBe("bad request");
        });
    });
    test("404-endpoint responds with 'not found' when article ID is valid but non-existant", () => {
      return request(app)
        .patch("/api/articles/111111111111111")
        .send({ inc_votes: 1 })
        .expect(404)
        .then((results) => {
          expect(results.body.msg).toBe("not found");
        });
    });
    test("400-endpoint responds with 'bad request' when request body does not include inc_votes", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({})
        .expect(400)
        .then((results) => {
          expect(results.body.msg).toBe("bad request");
        });
    });
  });
});

describe("/api/comments/", () => {
  describe("DELETE /api/comments/:comment_id", () => {
    test("204-endpoint deletes specified comment", () => {
      return request(app).delete("/api/comments/1").expect(204);
      //cannot send body on a 204 message
    });
    test("400-endpoint responds with 'bad request' when comment ID is not valid", () => {
      return request(app)
        .delete("/api/comments/orange")
        .expect(400)
        .then((results) => {
          expect(results.body.msg).toBe("bad request");
        });
    });
    test("400-endpoint responds with 'not found' when comment ID is valid but non-existant", () => {
      return request(app)
        .delete("/api/comments/99999999999")
        .expect(404)
        .then((results) => {
          expect(results.body.msg).toBe("not found");
        });
    });
  });
});

describe("/api/users", () => {
  describe("GET /api/users", () => {
    test("200-endpoint responds with an array of user objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((response) => {
          const users = response.body.users;
          expect(response.body.users.length).toBe(4);
          users.forEach((user) => {
            expect(user).toMatchObject({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            });
          });
        });
    });
  });
});
