"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friends_route_1 = require("./routes/friends.route");
const messages_route_1 = require("./routes/messages.route");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((req, _, next) => {
    const startTime = Date.now();
    next();
    const timeDelta = Date.now() - startTime;
    console.log(`${req.method}: ${req.url}  ${timeDelta}ms`);
});
app.use(express_1.default.json());
app.set("view engine", "hbs");
app.set("views", path_1.default.join(__dirname, "views")); // it defaults to the "views" folder anyway
app.use("/static", express_1.default.static(path_1.default.join(__dirname, "public")));
app.use("/friends", friends_route_1.FriendsRouter);
app.use("/messages", messages_route_1.MessagesRouter);
app.get("/", (_, res) => {
    res.send("hello user!");
});
app.get("/game", (_, res) => {
    res.render("index", {
        title: "PIG GAME",
        firstPlayerName: "PLAYER 1",
        firstPlayerTotalScore: "0",
        firstPlayerCurrentText: "CURRENT",
        firstPlayerCurrentScore: "0",
        newGameText: "NEW GAME",
        diceRollCTA: "ROLL DICE",
        diceHoldCTA: "HOLD",
        secondPlayerName: "PLAYER 2",
        secondPlayerTotalScore: "0",
        secondPlayerCurrentText: "CURRENT",
        secondPlayerCurrentScore: "0",
    });
});
// serving static files as response
app.get("/shoe", (_, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "IMAGES", "istockphoto-1205552515-612x612.jpg"));
});
app.listen(PORT, () => {
    console.log(`app is active and listening on port ${PORT}`);
});
