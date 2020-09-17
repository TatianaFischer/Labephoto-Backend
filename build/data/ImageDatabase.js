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
exports.ImageDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
const Image_1 = require("../model/Image");
class ImageDatabase extends BaseDatabase_1.BaseDatabase {
    createImg(image) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: image.getId(),
                subtitle: image.getSubtitle(),
                author: image.getAuthor(),
                createdDate: image.getCreatedDate(),
                file: image.getfile(),
                collection: image.getCollection(),
            })
                .into(this.tableNames.images);
        });
    }
    getImagesById(img_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const image = yield this.getConnection()
                .select("*")
                .from(this.tableNames.images)
                .where({ img_id });
            return Image_1.Image.toImageModel(image[0]);
        });
    }
    getAllImages() {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield this.getConnection()
                .select("*")
                .from(this.tableNames.images);
            return images;
        });
    }
    getAllImagesByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            const imagesByAuthor = yield this.getConnection()
                .select("*")
                .from(this.tableNames.images)
                .where({ author });
            return imagesByAuthor;
        });
    }
}
exports.ImageDatabase = ImageDatabase;
