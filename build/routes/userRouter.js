"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const userRouter = express_1.Router();
userRouter.post("/signup", new UserController_1.UserController().signup);
// userRouter.post("/login", new UserController().login);
exports.default = userRouter;
