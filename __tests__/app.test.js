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
          expect(results.body.msg).toBe("invalid id");
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
              });
            });
          });
      });
      test("array of articles is sorted by date in descending order", () => {
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
      test("article objects include a comment_count property with the number of comments on that article as its value", () => {
        return request(app)
          .get("/api/articles/")
          .expect(200)
          .then((response) => {
            const articles = response.body.articles;
            articles.forEach((article) => {
              expect(article).toMatchObject({
                comment_count: expect.any(String),
              });
            });
          });
      });
    });
  });
});
