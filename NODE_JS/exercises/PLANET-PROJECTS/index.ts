import { createReadStream } from "fs";
import { parse } from "csv-parse";


interface Planet {
  koi_disposition: string;
  koi_insol: number;
  koi_prad: number;
  kepler_name: string;
}

const habitablePlanets: Planet[] = [];

const isHabitable: (data: Planet)=> boolean = (data) => {
  return data['koi_disposition'] === 'CONFIRMED' &&
  data['koi_insol'] > 0.36 && data['koi_insol'] < 1.11 &&
  data['koi_prad'] < 1.6;
}
const listPlanets: (planets: Planet[]) => void = (planets) => {
  console.log(planets.map(planet => {
    return planet.kepler_name;
  }));
}

const getHabitablePlanets = () => {
  createReadStream("kepler_data.csv")
  .pipe(parse({
    "comment": "#",
    "columns": true,
  })
  .on('data', (data: Planet) => {
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
  })
  )
};

getHabitablePlanets();