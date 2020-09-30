"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = exports.ImageTagsName = void 0;
var ImageTagsName;
(function (ImageTagsName) {
    ImageTagsName["OLEO"] = "#\u00D3LEO";
    ImageTagsName["AQUARELA"] = "#AQUARELA";
    ImageTagsName["PASTEL"] = "#PASTEL";
    ImageTagsName["ACRILICA"] = "#ACR\u00CDLICA";
    ImageTagsName["AREIA"] = "#AREIA";
    ImageTagsName["DIGITAL"] = "#DIGITAL";
    ImageTagsName["OCIDENTAL"] = "#OCIDENTAL";
    ImageTagsName["ORIENTAL"] = "#ORIENTAL";
})(ImageTagsName = exports.ImageTagsName || (exports.ImageTagsName = {}));
class Image {
    constructor(id, subtitle, author, file, collection) {
        this.id = id;
        this.subtitle = subtitle;
        this.author = author;
        this.file = file;
        this.collection = collection;
    }
    //
    getId() {
        return this.id;
    }
    getSubtitle() {
        return this.subtitle;
    }
    getAuthor() {
        return this.author;
    }
    getfile() {
        return this.file;
    }
    getCollection() {
        return this.collection;
    }
    static toImageModel(image) {
        return new Image(image.id, image.subtitle, image.author, image.file, image.collection);
    }
}
exports.Image = Image;
