"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
const habitablePlanets = [];
const isHabitable = (data) => {
    return data['koi_disposition'] === 'CONFIRMED' &&
        data['koi_insol'] > 0.36 && data['koi_insol'] < 1.11 &&
        data['koi_prad'] < 1.6;
};
const listPlanets = (planets) => {
    console.log(planets.map(planet => {
        return planet.kepler_name;
    }));
};
const getHabitablePlanets = () => {
    (0, fs_1.createReadStream)("kepler_data.csv")
        .pipe((0, csv_parse_1.parse)({
        "comment": "#",
        "columns": true,
    })
        .on('data', (data) => {
        if (isHabitable(data)) {
            habitablePlanets.push(data);
        }
    })
        .on('error', () => {
        console.log("error parsing csv from stream");
    })
        .on('end', () => {
        console.log(`${habitablePlanets.length} planets found!`);
        listPlanets(habitablePlanets);
    }));
};
getHabitablePlanets();
