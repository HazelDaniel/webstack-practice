"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const os_1 = require("os");
const PORT = 8000;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.get("/timer", (_, res) => {
    const delay = 9000;
    let i = 0;
    while (i < delay) {
        i++;
    }
    console.log(`worker ${process.pid} handling /timer request`);
    return res.status(200);
});
app.get("/", (_, res) => {
    console.log("welcome to the root endpoint");
    return res.status(200);
});
if (cluster_1.default.isMaster) {
    console.log("serving from master");
    console.log(`this computer has ${(0, os_1.cpus)().length} cpus`);
    for (let i = 0; i < (0, os_1.cpus)().length; i++) {
        cluster_1.default.fork();
    }
}
else {
    server.listen(PORT, () => {
        console.log(`server listening on port ${PORT}`);
    });
}
