"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friends_route_1 = require("./routes/friends.route");
const messages_route_1 = require("./routes/messages.route");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((req, _, next) => {
    const startTime = Date.now();
    next();
    const timeDelta = Date.now() - startTime;
    console.log(`${req.method}: ${req.url}  ${timeDelta}ms`);
});
app.use(express_1.default.json());
app.use("/friends", friends_route_1.FriendsRouter);
app.use("/messages", messages_route_1.MessagesRouter);
app.get("/", (_, res) => {
    res.send("hello user!");
});
app.listen(PORT, () => {
    console.log(`app is active and listening on port ${PORT}`);
});
