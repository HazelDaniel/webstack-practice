const { parse } = require("csv-parse");
const fs = require("fs");
const planetsHabitable = {
  result: [],
  resultCount: 0,
};

function isHabitable(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (res) => {
    if (!isHabitable(res)) return;
    planetsHabitable.result.push(res);
    planetsHabitable.resultCount++;
  })
  .on("error", (error) => {
    console.log(error);
  })
  .on("end", () => {
    console.log(planetsHabitable.result.map((planet) => planet["kepler_name"]));
    console.log("done");
  });
