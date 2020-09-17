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
class ImageController {
    constructor() {
        this.createImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createImageBusiness = new CreateImageBusiness_1.CreateImageBusiness(new ImageDatabase_1.ImageDatabase(), new TagsDatabase_1.TagsDatabase(), new IdGenerator_1.IdGenerator(), new Authenticator_1.Authenticator());
                const input = {
                    subtitle: req.body.subtitle,
                    author: req.body.author,
                    createdDate: req.body.createdDate,
                    file: req.body.file,
                    collection: req.body.collection,
                };
                const tag = req.body.tag;
                const token = req.headers.authorization;
                const newImage = yield createImageBusiness.execute(input, tag, token);
                res.status(200).send({ token });
                // return token;
            }
            catch (err) {
                res.status(err.customErrorCode || 400).send({
                    message: err.message,
                });
            }
            finally {
                yield BaseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
}
exports.ImageController = ImageController;
