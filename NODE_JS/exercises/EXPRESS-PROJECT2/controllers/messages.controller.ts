import type { Message, RestError } from "../types";
import type { Request, Response } from "express";
import { messages } from "../models/messages.model";
import { friends } from "../models/friends.model";

export function createMessage(
  req: Request,
  res: Response<Message | RestError>
) {
  const inputMessage: Partial<Message> = req.body;
  let resError: RestError = { error: "title field missing" };
  if (!inputMessage.title) {
    return res.status(401).json(resError);
  }
  if (!inputMessage.body) {
    resError = { error: "message body missing" };
    return res.status(401).json(resError);
  }
  if (
    (!inputMessage.senderId && typeof inputMessage.senderId !== "number") ||
    Number.isNaN(Number(inputMessage.senderId)) ||
    Number(inputMessage?.senderId) > messages.length
  ) {
    resError = { error: "sender id missing or invalid" };
    return res.status(401).json(resError);
  }
  inputMessage.id = messages.length;
  friends[Number(inputMessage.senderId)].messages.push(inputMessage.body);
  messages.push(<Message>inputMessage);
  res.status(201).json(<Message>inputMessage);
}

export function readMessages(_: Request<null>, res: Response<Message[]>) {
  res.json(messages);
}

export function readMessage(
  req: Request<{ messageId: string }>,
  res: Response<Message | RestError>
) {
  const messageId = req.params.messageId;

  if (!messageId || Number.isNaN(+messageId) || +messageId >= messages.length) {
    const resError: RestError = { error: "message not found!" };
    return res.status(404).json(resError);
  }
  const result = messages[+messageId];

  res.json(result);
}
