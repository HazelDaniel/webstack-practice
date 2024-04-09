"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFriend = exports.readFriends = exports.createFriend = void 0;
const friends_model_1 = require("../models/friends.model");
const messages_model_1 = require("../models/messages.model");
function createFriend(req, res) {
    var _a;
    const inputFriend = req.body;
    let resError = { error: "name field missing" };
    if (!inputFriend.name) {
        return res.status(401).json(resError);
    }
    else if (!((_a = inputFriend.messages) === null || _a === void 0 ? void 0 : _a.length)) {
        inputFriend.messages = [];
    }
    if (!Array.isArray(inputFriend.messages)) {
        resError = { error: "invalid format for messages" };
        return res.status(401).json(resError);
    }
    inputFriend.id = friends_model_1.friends.length;
    friends_model_1.friends.push(inputFriend);
    res.status(201).json(inputFriend);
}
exports.createFriend = createFriend;
function readFriends(_, res) {
    res.json(friends_model_1.friends);
}
exports.readFriends = readFriends;
function readFriend(req, res) {
    const friendId = req.params.friendId;
    if (!friendId || Number.isNaN(+friendId) || +friendId >= friends_model_1.friends.length) {
        const resError = { error: "friend not found!" };
        return res.status(404).json(resError);
    }
    const result = friends_model_1.friends[+friendId];
    const resMessages = messages_model_1.messages.filter(message => {
        return (message.senderId === +friendId);
    }).map(message => message.body);
    result.messages = Array.from(new Set([...result.messages, ...resMessages]));
    res.json(result);
}
exports.readFriend = readFriend;
