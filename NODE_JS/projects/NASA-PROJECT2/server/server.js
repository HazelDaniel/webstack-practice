"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launch = exports.launches = exports.habitablePlanets = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
exports.PORT = process.env.PORT || 8000;
exports.habitablePlanets = [];
exports.launches = new Map();
exports.launch = {
    flightNumber: 100,
    launchDate: "December 20, 2024",
    mission: "Kepler exploration X",
    rocket: "Explorer IS1",
    destination: "Kepler-442 b",
    customers: ["hazel", "SpaceX"],
    upcoming: true,
    success: true,
};
exports.launches.set(exports.launch.flightNumber, exports.launch);
const isHabitable = (data) => {
    return (data["koi_disposition"] === "CONFIRMED" &&
        data["koi_insol"] > 0.36 &&
        data["koi_insol"] < 1.11 &&
        data["koi_prad"] < 1.6);
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
// app.use(cors());
app.use((0, morgan_1.default)("combined"));
const getHabitablePlanets = () => {
    return new Promise((resolve, reject) => {
        try {
            (0, fs_1.createReadStream)(path_1.default.join(__dirname, "src", "data", "kepler_data.csv")).pipe((0, csv_parse_1.parse)({
                comment: "#",
                columns: true,
            })
                .on("data", (data) => {
                if (isHabitable(data)) {
                    exports.habitablePlanets.push(data);
                }
            })
                .on("error", (err) => {
                // console.log("error parsing csv from stream");
                reject(err);
            })
                .on("end", () => {
                // console.log(`${habitablePlanets.length} planets found!`);
                resolve();
            }));
        }
        catch (error) {
            // console.error(`OPEN FILE ERROR: ${error}`);
            reject(error);
        }
    });
};
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/planets", (_, res) => {
    return res.status(200).json(exports.habitablePlanets);
});
app.get("/launches", (_, res) => {
    return res.status(200).json(Array.from(exports.launches.values()));
});
app.post("/launches", (req, res) => {
    const inputLaunch = req.body;
    if (!inputLaunch.destination ||
        !inputLaunch.launchDate ||
        !inputLaunch.mission ||
        !inputLaunch.rocket) {
        let resError = {};
        resError.error = "missing some fields";
        return res.status(400).json(resError);
    }
    if (isNaN(new Date(inputLaunch.launchDate).valueOf())) {
        let resError = {};
        resError.error = "incorrect date format!";
        return res.status(400).json(resError);
    }
    const fixedCustomers = ["Blue Origin", "SpaceX"];
    if (inputLaunch.customers) {
        inputLaunch.customers = [...inputLaunch.customers, ...fixedCustomers];
    }
    else {
        inputLaunch.customers = fixedCustomers;
    }
    inputLaunch.launchDate = new Date(inputLaunch.launchDate).toISOString();
    inputLaunch.upcoming =
        new Date(inputLaunch.launchDate).getTime() > Date.now();
    inputLaunch.success = true;
    inputLaunch.flightNumber = exports.launches.size
        ? Array.from(exports.launches.values())[exports.launches.size - 1].flightNumber + 1
        : 100;
    exports.launches.set(inputLaunch.flightNumber, inputLaunch);
    return res.status(201).json(inputLaunch);
});
app.delete("/launches/:launchId", (req, res) => {
    const launchId = +req.params.launchId;
    if (Number.isNaN(launchId)) {
        let resError = {};
        resError.error = "invalid launch id!";
        return res.status(400).json(resError);
    }
    if (!exports.launches.get(launchId)) {
        let resError = {};
        resError.error = "launch not found!";
        return res.status(404).json(resError);
    }
    const resLaunch = exports.launches.get(launchId);
    resLaunch.upcoming = false;
    resLaunch.success = false;
    return res.status(200).json(resLaunch);
});
app.get("/*", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "index.html"));
});
const server = http_1.default.createServer(app);
function loadServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield getHabitablePlanets();
            server.listen(exports.PORT, () => {
                console.log(`server is up and listening on port ${exports.PORT}`);
            });
        }
        catch (err) {
            console.error("server couldn't start up : error loading planets");
        }
    });
}
loadServer();
//TODO: install morgan middleware for logging
//TODO: implement a data access layer
//TODO: separation of concerns
