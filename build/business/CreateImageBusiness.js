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
exports.CreateImageBusiness = void 0;
const Image_1 = require("../model/Image");
const InvalidInputError_1 = require("../error/InvalidInputError");
const SetupError_1 = require("../error/SetupError");
class CreateImageBusiness {
    constructor(imageDatabase, tagsDatabase, idGenerator, authenticator) {
        this.imageDatabase = imageDatabase;
        this.tagsDatabase = tagsDatabase;
        this.idGenerator = idGenerator;
        this.authenticator = authenticator;
    }
    execute(imgInputDatas, imageTagsName, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!imgInputDatas.subtitle ||
                !imgInputDatas.createdDate ||
                !imgInputDatas.file ||
                !imgInputDatas.collection) {
                throw new InvalidInputError_1.InvalidInputError("Missing datas");
            }
            if (!token) {
                throw new SetupError_1.SetupError("Invalid token");
            }
            const verifyToken = yield this.authenticator.verifyToken(token);
            console.log("teste");
            if (!verifyToken.id) {
                throw new InvalidInputError_1.InvalidInputError("Invalid Id");
            }
            // console.log(verifyToken.id); ///////////////////////////
            const tagId = yield this.tagsDatabase.getTagsById(imageTagsName);
            if (!tagId) {
                throw new InvalidInputError_1.InvalidInputError("Invalid Tag");
            }
            const imageId = this.idGenerator.generate();
            yield this.imageDatabase.createImg(new Image_1.Image(imageId, imgInputDatas.subtitle, verifyToken.id, imgInputDatas.createdDate, imgInputDatas.file, imgInputDatas.collection));
            yield this.tagsDatabase.insertTagsToImage(imageId, tagId);
            // console.log(imageTagsName, token, imgInputDatas);//////////////
        });
    }
}
exports.CreateImageBusiness = CreateImageBusiness;
