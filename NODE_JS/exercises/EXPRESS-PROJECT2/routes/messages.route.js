"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesRouter = void 0;
const express_1 = __importDefault(require("express"));
const messages_controller_1 = require("../controllers/messages.controller");
exports.MessagesRouter = express_1.default.Router();
exports.MessagesRouter.get("/", messages_controller_1.readMessages);
exports.MessagesRouter.get("/:messageId", messages_controller_1.readMessage);
exports.MessagesRouter.post("/", messages_controller_1.createMessage);
