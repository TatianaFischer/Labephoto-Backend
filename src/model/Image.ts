export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private author: string,
    private createdDate: string,
    private file: string,
    private collection: string
  ) {}

  //
  public getId() {
    return this.id;
  }

  public getSubtitle() {
    return this.subtitle;
  }

  public getAuthor() {
    return this.author;
  }

  public getCreatedDate() {
    return this.createdDate;
  }

  public getfile() {
    return this.file;
  }
  public getCollection() {
    return this.collection;
  }

  public static toImageModel(image: ImageInputDTO): Image {
    return new Image(
      image.id,
      image.subtitle,
      image.author,
      image.createdDate,
      image.file,
      image.collection
    );
  }
}

export interface ImageInputDTO {
  id: string;
  subtitle: string;
  author: string;
  createdDate: string;
  file: string;
  collection: string;
}

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
