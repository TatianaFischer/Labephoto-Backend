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
exports.TagsDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
const Image_1 = require("../model/Image");
class TagsDatabase extends BaseDatabase_1.BaseDatabase {
    getTagsById(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tags = yield this.getConnection()
                    .select("id")
                    .from(this.tableNames.tags)
                    .where({ name });
                console.log(tags[0]);
                return Image_1.Image.toImageModel(tags[0].id);
            }
            catch (err) {
                throw new Error(err.sqlMessage || err.message);
            }
        });
    }
    insertTagsToImage(imageId, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.getConnection()
                    .insert({
                    img_id: imageId,
                    tags_id: tagId,
                })
                    .into(this.tableNames.imageWithTagsId);
            }
            catch (err) {
                throw new Error(err.sqlMessage || err.message);
            }
        });
    }
}
exports.TagsDatabase = TagsDatabase;
