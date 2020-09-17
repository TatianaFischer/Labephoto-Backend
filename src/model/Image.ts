export interface ImageInputDTO {
  subtitle: string;
  author: string;
  createdDate: Date;
  file: string;
  collection: string;
}

export interface TagsInputDTO {
  id: string;
  name: ImageTagsName;
}
export enum ImageTagsName {
  OLEO = "#ÓLEO",
  AQUARELA = "#AQUARELA",
  PASTEL = "#PASTEL",
  ACRILICA = "#ACRÍLICA",
  AREIA = "#AREIA",
  DIGITAL = "#DIGITAL",
  OCIDENTAL = "#OCIDENTAL",
  ORIENTAL = "#ORIENTAL",
}

export class Image {
  constructor(
    private id: string,
    private subtitle: string,
    private author: string,
    private createdDate: Date,
    private file: string,
    private collection: string,
    private userId: string
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

  public static toImageModel(image: any): Image {
    return new Image(
      image.id,
      image.subtitle,
      image.author,
      image.createdDate,
      image.file,
      image.collection,
      image.userId
    );
  }
}
