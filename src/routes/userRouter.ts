import { Router } from "express";
import { UserController } from "../controller/UserController";

const userRouter = Router();

userRouter.post("/signup", new UserController().signup);
// userRouter.post("/login", new UserController().login);

export default userRouter;
