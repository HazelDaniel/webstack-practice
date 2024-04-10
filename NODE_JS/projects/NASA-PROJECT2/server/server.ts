import express from "express";
import http from "http";
import cors from "cors";
import type { Planet, Launch } from "./types";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import path from "path";

export const PORT = process.env.PORT || 8000;

export const habitablePlanets: Planet[] = [];

export const launches: Map<string | number, Launch> = new Map();

export const launch: Launch = {
  flightNumber: 100,
  launchDate: new Date("December 20, 2024"),
  mission: "Kepler exploration X",
  rocket: "Explorer IS1",
  destination: "Kepler-442 b",
  customers: ["hazel", "SpaceX"],
  upcoming: true,
  success: true
};

launches.set(launch.flightNumber, launch);

const isHabitable: (data: Planet) => boolean = (data) => {
  return (
    data["koi_disposition"] === "CONFIRMED" &&
    data["koi_insol"] > 0.36 &&
    data["koi_insol"] < 1.11 &&
    data["koi_prad"] < 1.6
  );
};

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// app.use(cors());

const getHabitablePlanets: () => Promise<void> = () => {
  return new Promise((resolve, reject) => {
    try {
      createReadStream(
        path.join(__dirname, "src", "data", "kepler_data.csv")
      ).pipe(
        parse({
          comment: "#",
          columns: true,
        })
          .on("data", (data: Planet) => {
            if (isHabitable(data)) {
              habitablePlanets.push(data);
            }
          })
          .on("error", (err) => {
            console.log("error parsing csv from stream");
            reject(err);
          })
          .on("end", () => {
            console.log(`${habitablePlanets.length} planets found!`);
            resolve();
          })
      );
    } catch (error) {
      console.error(`OPEN FILE ERROR: ${error}`);
      reject(error);
    }
  });
};

app.get("/planets", (_, res) => {
  return res.status(200).json(habitablePlanets);
});

app.get("/launches", (_, res) => {
  return res.status(200).json(Array.from(launches.values()));
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

//TODO: install morgan middleware for logging
//TODO: implement a data access layer