import express from 'express';
import { createMessage, readMessage, readMessages } from '../controllers/messages.controller';

export const MessagesRouter = express.Router();

MessagesRouter.get("/", readMessages);
MessagesRouter.get("/:messageId", readMessage);

MessagesRouter.post("/", createMessage);