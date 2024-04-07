"use strict";
const http = require("http");
const request = http.request("http://www.google.com", (request) => {
    request.on("data", (data) => {
        console.log(`data received ${data}`);
    });
    request.on("end", () => {
        console.log("connection closed");
    });
});
request.end();
