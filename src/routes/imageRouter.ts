import { Router } from "express";
import { ImageController } from "../controller/ImageController";

const imageRouter = Router();
const imageController = new ImageController();

imageRouter.post("/", imageController.createImage);
imageRouter.get("/feed", imageController.getImages);

export default imageRouter;
