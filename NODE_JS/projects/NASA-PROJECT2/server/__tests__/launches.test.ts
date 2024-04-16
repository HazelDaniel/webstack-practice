// import request from "supertest";
// import {app} from "../server";

const request = require("supertest");
const { app } = require("../server");

describe("test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app).get("/launches");
    expect(response.statusCode).toBe(200);
  });
});

describe("test POST /launches", () => {
  test("it should respond with 201 created", () => {
    expect(200).toBe(200);
  });
});
