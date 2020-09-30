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
class TagsDatabase extends BaseDatabase_1.BaseDatabase {
    getTagsIdByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tags = yield this.getConnection()
                    .select("id")
                    .from(this.tableNames.tags)
                    .whereIn("name", name);
                return tags;
            }
            catch (err) {
                throw new Error(err.sqlMessage || err.message);
            }
        });
    }
    insertTagsToImage(imageId, tagId) {
        return __awaiter(this, void 0, void 0, function* () {
            const imageTagInsert = tagId.map((tag) => ({
                img_id: imageId,
                tags_id: tag,
            }));
            try {
                yield this.getConnection()
                    .insert(imageTagInsert)
                    .into(this.tableNames.imageWithTagsId);
            }
            catch (err) {
                throw new Error(err.sqlMessage || err.message);
            }
        });
    }
}
exports.TagsDatabase = TagsDatabase;
