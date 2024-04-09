import express from "express";
import { FriendsRouter } from "./routes/friends.route";
import { MessagesRouter } from "./routes/messages.route";

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, _, next) => {
  const startTime = Date.now();
  next();
  const timeDelta = Date.now() - startTime;
  console.log(`${req.method}: ${req.url}  ${timeDelta}ms`);
});

app.use(express.json());
app.use("/friends", FriendsRouter);
app.use("/messages", MessagesRouter);


app.get("/", (_, res) => {
  res.send("hello user!");
});

app.listen(PORT, () => {
  console.log(`app is active and listening on port ${PORT}`);
});