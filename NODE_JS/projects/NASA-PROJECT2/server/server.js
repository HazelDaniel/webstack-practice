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
exports.habitablePlanets = exports.PORT = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
const path_1 = __importDefault(require("path"));
exports.PORT = process.env.PORT || 8000;
exports.habitablePlanets = [];
const isHabitable = (data) => {
    return (data["koi_disposition"] === "CONFIRMED" &&
        data["koi_insol"] > 0.36 &&
        data["koi_insol"] < 1.11 &&
        data["koi_prad"] < 1.6);
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
// app.use(cors());
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
                console.log("error parsing csv from stream");
                reject(err);
            })
                .on("end", () => {
                console.log(`${exports.habitablePlanets.length} planets found!`);
                resolve();
            }));
        }
        catch (error) {
            console.error(`OPEN FILE ERROR: ${error}`);
            reject(error);
        }
    });
};
app.get("/planets", (_, res) => {
    res.status(200).json(exports.habitablePlanets);
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
