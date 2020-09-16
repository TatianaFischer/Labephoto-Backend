import { BaseDatabase } from "./base/BaseDatabase";
import { Image } from "../model/Image";

export class ImageDatabase extends BaseDatabase {
  public async createImg(image: Image): Promise<void> {
    await this.getConnection()
      .insert({
        id: image.getId(),
        subtitle: image.getSubtitle(),
        author: image.getAuthor(),
        createdDate: image.getCreatedDate(),
        file: image.getfile(),
        collection: image.getCollection(),
      })
      .into(this.tableNames.images);
  }
  public async getImagesById(img_id: string): Promise<Image | undefined> {
    const image = await this.getConnection()
      .select("*")
      .from(this.tableNames.images)
      .where({ img_id });
    return Image.toImageModel(image[0]);
  }

  public async getAllImages(): Promise<Image[] | undefined> {
    const images = await this.getConnection()
      .select("*")
      .from(this.tableNames.images);

    return images;
  }

  public async getAllImagesByAuthor(
    author: string
  ): Promise<Image[] | undefined> {
    const imagesByAuthor = await this.getConnection()
      .select("*")
      .from(this.tableNames.images)
      .where({ author });

    return imagesByAuthor;
  }
}
