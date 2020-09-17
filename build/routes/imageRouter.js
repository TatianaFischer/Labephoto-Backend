"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ImageController_1 = require("../controller/ImageController");
const imageRouter = express_1.Router();
const imageController = new ImageController_1.ImageController();
imageRouter.post("/", imageController.createImage);
// imageRouter.get("/:id", imageController.getMusic);
exports.default = imageRouter;
