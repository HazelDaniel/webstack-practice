"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const friends_controller_1 = require("./controllers/friends.controller");
const messages_controller_1 = require("./controllers/messages.controller");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((req, _, next) => {
    const startTime = Date.now();
    next();
    const timeDelta = Date.now() - startTime;
    console.log(`${req.method}: ${req.url}  ${timeDelta}ms`);
});
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.send("hello user!");
});
app.post("/friends", friends_controller_1.createFriend);
app.get("/friends", friends_controller_1.readFriends);
app.get("/friends/:friendId", friends_controller_1.readFriend);
app.post("/messages", messages_controller_1.createMessage);
app.get("/messages", messages_controller_1.readMessages);
app.get("/messages/:messageId", messages_controller_1.readMessage);
app.listen(PORT, () => {
    console.log(`app is active and listening on port ${PORT}`);
});
