"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const friends = [];
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
app.post("/friends", (req, res) => {
    const inputFriend = req.body;
    const resError = { error: "name field missing" };
    if (!inputFriend.name) {
        return res.status(401).json(resError);
    }
    inputFriend.id = friends.length;
    friends.push(inputFriend);
    res.status(201).json(inputFriend);
});
app.get("/friends", (_, res) => {
    res.json(friends);
});
app.get("/friends/:friendId", (req, res) => {
    const friendId = req.params.friendId;
    if (!friendId || Number.isNaN(+friendId) || +friendId >= friends.length) {
        const resError = { error: "friend not found!" };
        return res.status(404).json(resError);
    }
    res.json(friends[+friendId]);
});
app.listen(PORT, () => {
    console.log(`app is active and listening on port ${PORT}`);
});
