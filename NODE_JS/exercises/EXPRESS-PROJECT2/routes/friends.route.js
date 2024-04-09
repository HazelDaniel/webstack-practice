"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsRouter = void 0;
const express_1 = __importDefault(require("express"));
const friends_controller_1 = require("../controllers/friends.controller");
exports.FriendsRouter = express_1.default.Router();
exports.FriendsRouter.get("/", friends_controller_1.readFriends);
exports.FriendsRouter.get("/:friendId", friends_controller_1.readFriend);
exports.FriendsRouter.post("/", friends_controller_1.createFriend);
