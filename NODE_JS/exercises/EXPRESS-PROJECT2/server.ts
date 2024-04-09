import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

interface Friend {
  name: string;
  id: number;
}

interface RestError {
  error: string;
}

type FriendList = Friend[];

const friends: FriendList = [];

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

app.post("/friends", (req, res) => {
  const inputFriend: Partial<Friend> = req.body;
  const resError: RestError = { error: "name field missing" };
  if (!inputFriend.name) {
    return res.status(401).json(resError);
  }
  inputFriend.id = friends.length;
  friends.push(<Friend>inputFriend);
  res.status(201).json(inputFriend);
});

app.get("/friends", (_, res) => {
  res.json(friends);
});

app.get("/friends/:friendId", (req, res) => {
  const friendId = req.params.friendId;
  if (!friendId || Number.isNaN(+friendId) || +friendId >= friends.length) {
    const resError: RestError = {error: "friend not found!"}
    return res.status(404).json(resError);
  }

  res.json(friends[+friendId]);
});

app.listen(PORT, () => {
  console.log(`app is active and listening on port ${PORT}`);
});
