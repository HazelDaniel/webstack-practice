"use strict";
const express = require("express");
const app = express();
const PORT = 3000;
const friends = [
    {
        id: 1,
        name: "Sir Isaac Newton",
    },
    {
        id: 2,
        name: "Sir Albert Einstein",
    },
];
app.listen(PORT, () => {
    console.log(`listening on port ${PORT} ...`);
});
app.use((req, res, next) => {
    const start = Date.now();
    next();
    const delta = Date.now() - start;
    console.log(`${req.method} to ${req.url}. elapsed time: ${delta}ms`);
});
app.use(express.json());
app.post("/friends", (req, res) => {
    console.log(req.body);
    const friendName = req.body.name;
    if (!friendName) {
        return res.status(400).json({
            reason: "name not provided",
        });
    }
    const friendData = {
        id: friends.length + 1,
        name: friendName,
    };
    friends.push();
    res.status(200).json(friendData);
});
app.get("/friends", (req, res) => {
    res.json(friends);
});
app.get("/friends/:friendId", (req, res) => {
    if (typeof +req.params.friendId === "number" &&
        !isNaN(+req.params.friendId)) {
        const friendId = +req.params.friendId;
        if (!!friends[friendId]) {
            res.status(200).json(friends[friendId]);
        }
        else {
            res.status(404).json({
                error: "friend not found!",
            });
        }
    }
    else {
        res.status(501).json({
            reason: "not implemented",
        });
    }
});
app.get("/messages", (req, res) => {
    res.send(`
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>messages route</title>
</head>
<body>
    <ul>
        <li>strong men shape the world , weak men are shaped by it.</li>
        <li>leave your plans in man's hands and it gets manhandled</li>
    </ul>
</body>
</html>
  
  `);
});
