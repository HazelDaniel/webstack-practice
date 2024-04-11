import express from "express";
import http from "http";
import cors from "cors";
import type { Planet, Launch, ResponseErrorBody } from "./types";
import type { Request } from "express";
import { createReadStream } from "fs";
import { parse } from "csv-parse";
import morgan from "morgan";
import path from "path";

export const PORT = process.env.PORT || 8000;

export const habitablePlanets: Planet[] = [];

export const launches: Map<string | number, Launch> = new Map();

export const launch: Launch = {
  flightNumber: 100,
  launchDate: "December 20, 2024",
  mission: "Kepler exploration X",
  rocket: "Explorer IS1",
  destination: "Kepler-442 b",
  customers: ["hazel", "SpaceX"],
  upcoming: true,
  success: true,
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
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
// app.use(cors());
app.use(morgan("combined"));

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
            // console.log("error parsing csv from stream");
            reject(err);
          })
          .on("end", () => {
            // console.log(`${habitablePlanets.length} planets found!`);
            resolve();
          })
      );
    } catch (error) {
      // console.error(`OPEN FILE ERROR: ${error}`);
      reject(error);
    }
  });
};

app.use(express.static(path.join(__dirname, "public")));


app.get("/planets", (_, res) => {
  return res.status(200).json(habitablePlanets);
});

app.get("/launches", (_, res) => {
  return res.status(200).json(Array.from(launches.values()));
});

app.post("/launches", (req: Request<Launch>, res) => {
  const inputLaunch: Launch = req.body;
  if (
    !inputLaunch.destination ||
    !inputLaunch.launchDate ||
    !inputLaunch.mission ||
    !inputLaunch.rocket
  ) {
    let resError: Partial<ResponseErrorBody> = {};
    resError.error = "missing some fields";
    return res.status(400).json(resError);
  }

  if (isNaN(new Date(inputLaunch.launchDate).valueOf())) {
    let resError: Partial<ResponseErrorBody> = {};
    resError.error = "incorrect date format!";
    return res.status(400).json(resError);
  }

  const fixedCustomers = ["Blue Origin", "SpaceX"];

  if (inputLaunch.customers) {
    inputLaunch.customers = [...inputLaunch.customers, ...fixedCustomers];
  } else {
    inputLaunch.customers = fixedCustomers;
  }
  inputLaunch.launchDate = new Date(inputLaunch.launchDate).toISOString();
  inputLaunch.upcoming =
    new Date(inputLaunch.launchDate).getTime() > Date.now();
  inputLaunch.success = true;

  inputLaunch.flightNumber = launches.size
    ? Array.from(launches.values())[launches.size - 1].flightNumber + 1
    : 100;

  launches.set(inputLaunch.flightNumber, inputLaunch);
  return res.status(201).json(inputLaunch);
});

app.delete("/launches/:launchId", (req: Request<{ launchId: string }>, res) => {
  const launchId: number = +req.params.launchId;

  if (Number.isNaN(launchId)) {
    let resError: Partial<ResponseErrorBody> = {};
    resError.error = "invalid launch id!";
    return res.status(400).json(resError);
  }

  if (!launches.get(launchId)) {
    let resError: Partial<ResponseErrorBody> = {};
    resError.error = "launch not found!";
    return res.status(404).json(resError);
  }

  const resLaunch = launches.get(launchId) as Launch;
  resLaunch.upcoming = false;
  resLaunch.success = false;

  return res.status(200).json(resLaunch);
});

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

//TODO: install morgan middleware for logging
//TODO: implement a data access layer
//TODO: separation of concerns
