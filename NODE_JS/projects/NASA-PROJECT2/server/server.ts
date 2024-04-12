import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { getHabitablePlanets } from "./src/models/planets.model";
import { LaunchesRouter } from "./src/controllers/routes/launches.route";
import { PlanetsRouter } from "./src/controllers/routes/planets.route";

export const PORT = process.env.PORT || 8000;

const app = express();


app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(morgan("combined"));

app.use(express.static(path.join(__dirname, "public")));
app.use("/launches", LaunchesRouter);
app.use("/planets", PlanetsRouter);

app.get("/*", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = http.createServer(app);

async function loadServer() {
  try {
    await getHabitablePlanets();

    server.listen(PORT, () => {
      console.log(`server is up and listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("server couldn't start up : error loading planets");
  }
}

loadServer();

//TODO: implement a data access layer
//TODO: separation of concerns