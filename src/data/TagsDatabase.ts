import { BaseDatabase } from "./base/BaseDatabase";
import { Image } from "../model/Image";

export class TagsDatabase extends BaseDatabase {
  public async getTagsById(name: string): Promise<any> {
    try {
      const tags = await this.getConnection()
        .select("id")
        .from(this.tableNames.tags)
        .where({ name });
      //   console.log(tags[0]);
      return Image.toImageModel(tags[0].id);
    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async insertTagsToImage(imageId: string, tagId: string) {
    try {
      await this.getConnection()
        .insert({
          img_id: imageId,
          tags_id: tagId,
        })
        .into(this.tableNames.imageWithTagsId);
    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
