import { BaseDatabase } from "./base/BaseDatabase";
import { Image } from "../model/Image";

export class TagsDatabase extends BaseDatabase {
  public async getTagsIdByName(name: string[]): Promise<any> {
    try {
      const tags = await this.getConnection()
        .select("id")
        .from(this.tableNames.tags)
        .whereIn("name", name);

      return tags;
    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  }

  public async insertTagsToImage(imageId: string, tagId: string[]) {
    const imageTagInsert = tagId.map((tag) => ({
      img_id: imageId,
      tags_id: tag,
    }));
    try {
      await this.getConnection()
        .insert(imageTagInsert)
        .into(this.tableNames.imageWithTagsId);
    } catch (err) {
      throw new Error(err.sqlMessage || err.message);
    }
  }
}
