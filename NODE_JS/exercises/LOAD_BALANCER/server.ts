import cluster from "cluster";
import express from "express";
import http from "http";
import { cpus } from "os";

const PORT = 8000;

const app = express();
const server = http.createServer(app);

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

if (cluster.isMaster) {
  console.log("serving from master");
  console.log(`this computer has ${cpus().length} cpus`);
  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }
} else {
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
  });
}
