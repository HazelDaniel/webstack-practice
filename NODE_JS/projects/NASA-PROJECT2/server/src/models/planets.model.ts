import { createReadStream } from 'fs';
import { parse } from "csv-parse";
import path from 'path';
import type { Planet } from "../../types";

export const habitablePlanets: Planet[] = [];

export const isHabitable: (data: Planet) => boolean = (data) => {
  return (
    data["koi_disposition"] === "CONFIRMED" &&
    data["koi_insol"] > 0.36 &&
    data["koi_insol"] < 1.11 &&
    data["koi_prad"] < 1.6
  );
};

export const getHabitablePlanets: () => Promise<void> = () => {
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


export const getPlanets: () => Planet[] = () => {
  return habitablePlanets;
}