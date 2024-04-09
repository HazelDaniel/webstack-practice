import express from 'express';
import { createFriend, readFriend, readFriends } from '../controllers/friends.controller';

export const FriendsRouter = express.Router();

FriendsRouter.get("/", readFriends);
FriendsRouter.get("/:friendId", readFriend);

FriendsRouter.post("/", createFriend);