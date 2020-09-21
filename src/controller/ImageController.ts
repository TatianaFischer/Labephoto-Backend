import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { ImageDatabase } from "../data/ImageDatabase";
import { TagsDatabase } from "../data/TagsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CreateImageBusiness } from "../business/CreateImageBusiness";
import { ImageInputDTO } from "../model/Image";

export class ImageController {
  public createImage = async (req: Request, res: Response) => {
    try {
      const createImageBusiness = new CreateImageBusiness(
        new ImageDatabase(),
        new TagsDatabase(),
        new IdGenerator(),
        new Authenticator()
      );

      const input: ImageInputDTO = {
        subtitle: req.body.subtitle,

        createdDate: req.body.createdDate,
        file: req.body.file,
        collection: req.body.collection,
      };
      // console.log(input); ////////////

      const tag = req.body.tag;
      // console.log(tag); /////////////

      const token = req.headers.authorization as string;
      // console.log(token); /////////////

      const result = await createImageBusiness.execute(input, tag, token);
      // console.log(result); //////////////

      res.status(200).send("Image created successfully");
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };
}
