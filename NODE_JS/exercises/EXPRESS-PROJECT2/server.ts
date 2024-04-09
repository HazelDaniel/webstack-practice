import express from "express";
import {
  createFriend,
  readFriend,
  readFriends,
} from "./controllers/friends.controller";
import { createMessage, readMessage, readMessages } from "./controllers/messages.controller";

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, _, next) => {
  const startTime = Date.now();
  next();
  const timeDelta = Date.now() - startTime;
  console.log(`${req.method}: ${req.url}  ${timeDelta}ms`);
});

app.use(express.json());

app.get("/", (_, res) => {
  res.send("hello user!");
});

app.post("/friends", createFriend);
app.get("/friends", readFriends);
app.get("/friends/:friendId", readFriend);

app.post("/messages", createMessage);
app.get("/messages" , readMessages);
app.get("/messages/:messageId" , readMessage);

app.listen(PORT, () => {
  console.log(`app is active and listening on port ${PORT}`);
});
