const request = require("supertest");
const db = require("../db/data/test-data");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const connection = require("../db/connection.js");
const endpoints = require("../endpoints.json");

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
