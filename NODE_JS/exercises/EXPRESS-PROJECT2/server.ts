import express from "express";
import { FriendsRouter } from "./routes/friends.route";
import { MessagesRouter } from "./routes/messages.route";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use((req, _, next) => {
  const startTime = Date.now();
  next();
  const timeDelta = Date.now() - startTime;
  console.log(`${req.method}: ${req.url}  ${timeDelta}ms`);
});

app.use(express.json());

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views")); // it defaults to the "views" folder anyway

app.use("/static", express.static(path.join(__dirname, "public")));
app.use("/friends", FriendsRouter);
app.use("/messages", MessagesRouter);

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
  res.sendFile(
    path.join(
      __dirname,
      "public",
      "IMAGES",
      "istockphoto-1205552515-612x612.jpg"
    )
  );
});

app.listen(PORT, () => {
  console.log(`app is active and listening on port ${PORT}`);
});
