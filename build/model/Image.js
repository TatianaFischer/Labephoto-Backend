"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
class Image {
    constructor(id, subtitle, author, createdDate, file, collection) {
        this.id = id;
        this.subtitle = subtitle;
        this.author = author;
        this.createdDate = createdDate;
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
    getCreatedDate() {
        return this.createdDate;
    }
    getfile() {
        return this.file;
    }
    getCollection() {
        return this.collection;
    }
    static toImageModel(image) {
        return new Image(image.id, image.subtitle, image.author, image.createdDate, image.file, image.collection);
    }
}
exports.Image = Image;
// export enum ImageTagsType {
//   OLEO = "#ÓLEO",
//   AQUARELA = "#AQUARELA",
//   PASTEL = "#PASTEL",
//   ACRILICA = "#ACRÍLICA",
//   AREIA = "#AREIA",
//   DIGITAL = "#DIGITAL",
//   OCIDENTAL = "#OCIDENTAL",
//   ORIENTAL = "#ORIENTAL"
// }
