"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageController = void 0;
const BaseDatabase_1 = require("../data/base/BaseDatabase");
const ImageDatabase_1 = require("../data/ImageDatabase");
const TagsDatabase_1 = require("../data/TagsDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const Authenticator_1 = require("../services/Authenticator");
const CreateImageBusiness_1 = require("../business/CreateImageBusiness");
const GetImagesBusiness_1 = require("../business/GetImagesBusiness");
const GetImageByIdBusiness_1 = require("../business/GetImageByIdBusiness");
const createImageBusiness = new CreateImageBusiness_1.CreateImageBusiness(new ImageDatabase_1.ImageDatabase(), new TagsDatabase_1.TagsDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
class ImageController {
    constructor() {
        this.createImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    subtitle: req.body.subtitle,
                    file: req.body.file,
                    collection: req.body.collection,
                };
                const tag = req.body.tag;
                const token = req.headers.authorization;
                const result = yield createImageBusiness.execute(input, tag, token);
                res.status(200).send("Image created successfully");
            }
            catch (err) {
                res.status(err.erroCode || 400).send({
                    message: err.message,
                });
            }
            finally {
                yield BaseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
        this.getImages = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getImagesBusiness = new GetImagesBusiness_1.GetImagesBusiness(new ImageDatabase_1.ImageDatabase(), new Authenticator_1.Authenticator());
                const token = req.headers.authorization;
                const result = yield getImagesBusiness.execute(token);
                res.status(200).send({ result });
            }
            catch (err) {
                res.status(err.erroCode || 400).send({ message: err.message });
            }
        });
        this.getImageById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const getImageByIdBusiness = new GetImageByIdBusiness_1.GetImageByIdBusiness(new ImageDatabase_1.ImageDatabase(), new Authenticator_1.Authenticator());
                const id = req.params.id;
                const token = req.headers.authorization;
                const result = yield getImageByIdBusiness.execute(id, token);
                res.status(200).send(result);
            }
            catch (err) {
                res.status(err.erroCode || 400).send({ message: err.message });
            }
            yield BaseDatabase_1.BaseDatabase.destroyConnection();
        });
    }
}
exports.ImageController = ImageController;
