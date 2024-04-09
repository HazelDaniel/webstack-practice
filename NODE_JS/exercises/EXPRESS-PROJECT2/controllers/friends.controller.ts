import { IncomingMessage, ServerResponse } from "http";
import { friends } from "../models/friends.model";
import type { Friend, RestError } from "../types";
import type { Request, Response } from "express";
import { messages } from "../models/messages.model";

export function createFriend(
  req: Request,
  res: Response<Friend | RestError>
) {
  const inputFriend: Partial<Friend> = req.body;
  let resError: RestError = { error: "name field missing" };
  if (!inputFriend.name) {
    return res.status(401).json(resError);
  } else if (!inputFriend.messages?.length) {
    inputFriend.messages = [];
  }
  if (!Array.isArray(inputFriend.messages)) {
    resError = {error: "invalid format for messages"};
    return res.status(401).json(resError);
  }
  inputFriend.id = friends.length;
  friends.push(<Friend>inputFriend);
  res.status(201).json(<Friend>inputFriend);
}

export function readFriends(_: Request<null>, res: Response<Friend[]>) {
  res.json(friends);
}

export function readFriend(
  req: Request<{ friendId: string }>,
  res: Response<Friend | RestError>
) {
  const friendId = req.params.friendId;
  if (!friendId || Number.isNaN(+friendId) || +friendId >= friends.length) {
    const resError: RestError = { error: "friend not found!" };
    return res.status(404).json(resError);
  }
  const result = friends[+friendId];
  const resMessages = messages.filter(message => {
    return (message.senderId === +friendId );
  }).map(message => message.body);

  result.messages = Array.from(new Set([...result.messages, ...resMessages]));

  res.json(result);
}
