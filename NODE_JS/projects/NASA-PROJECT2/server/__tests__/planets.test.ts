// import request from "supertest";
// import { app } from "../server";
const request = require("supertest");
const {app} = require("../server");

describe("[TEST SUITE] /planets", () => {
  test("[UNIT]: test GET /planets returns an array of planets", async () => {
    const response = await request(app)
    .get("/planets")
    .expect("Content-Type", /json/)
    expect(200);

  });
});
