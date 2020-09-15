import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);

export default userRouter;
