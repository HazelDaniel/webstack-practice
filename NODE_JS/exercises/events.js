"use strict";
const EventEmitter = require("events");
const emmiter = new EventEmitter();
emmiter.on("start", (..._) => {
    console.log("events started");
});
emmiter.on("processing", (arg) => {
    console.log("event processing ", arg);
});
emmiter.on("end", () => {
    console.log("event ended");
});
setTimeout(() => {
    emmiter.emit("start");
}, 3000);
setTimeout(() => {
    emmiter.emit("processing", "first argument");
}, 3500);
setTimeout(() => {
    emmiter.emit("end");
}, 5000);
