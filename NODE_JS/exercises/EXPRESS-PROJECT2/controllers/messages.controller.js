"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readMessage = exports.readMessages = exports.createMessage = void 0;
const messages_model_1 = require("../models/messages.model");
const friends_model_1 = require("../models/friends.model");
function createMessage(req, res) {
    const inputMessage = req.body;
    let resError = { error: "title field missing" };
    if (!inputMessage.title) {
        return res.status(401).json(resError);
    }
    if (!inputMessage.body) {
        resError = { error: "message body missing" };
        return res.status(401).json(resError);
    }
    if ((!inputMessage.senderId && typeof inputMessage.senderId !== "number") ||
        Number.isNaN(Number(inputMessage.senderId)) ||
        Number(inputMessage === null || inputMessage === void 0 ? void 0 : inputMessage.senderId) > messages_model_1.messages.length) {
        resError = { error: "sender id missing or invalid" };
        return res.status(401).json(resError);
    }
    inputMessage.id = messages_model_1.messages.length;
    friends_model_1.friends[Number(inputMessage.senderId)].messages.push(inputMessage.body);
    messages_model_1.messages.push(inputMessage);
    res.status(201).json(inputMessage);
}
exports.createMessage = createMessage;
function readMessages(_, res) {
    res.json(messages_model_1.messages);
}
exports.readMessages = readMessages;
function readMessage(req, res) {
    const messageId = req.params.messageId;
    if (!messageId || Number.isNaN(+messageId) || +messageId >= messages_model_1.messages.length) {
        const resError = { error: "message not found!" };
        return res.status(404).json(resError);
    }
    const result = messages_model_1.messages[+messageId];
    res.json(result);
}
exports.readMessage = readMessage;
