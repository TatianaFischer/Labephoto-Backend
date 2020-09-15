"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const userRouter = express_1.Router();
const userController = new UserController_1.UserController();
userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
exports.default = userRouter;
