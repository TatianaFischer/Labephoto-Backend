import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { ImageDatabase } from "../data/ImageDatabase";
import { TagsDatabase } from "../data/TagsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { InvalidInputError } from "../error/InvalidInputError";
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
        author: req.body.author,
        createdDate: req.body.createdDate,
        file: req.body.file,
        collection: req.body.collection,
      };

      const tag = req.body.tag;
      const token = req.headers.authorization as string;

      const newImage = await createImageBusiness.execute(input, tag, token);

      res.status(200).send({ token });

      return token;
    } catch (err) {
      res.status(err.customErrorCode || 400).send({
        message: err.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };
}
