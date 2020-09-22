import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { ImageDatabase } from "../data/ImageDatabase";
import { TagsDatabase } from "../data/TagsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { CreateImageBusiness } from "../business/CreateImageBusiness";
import { GetImagesBusiness } from "../business/GetImagesBusiness";
import { ImageInputDTO } from "../model/Image";
import { GetImageByIdBusiness } from "../business/GetImageByIdBusiness";

const createImageBusiness = new CreateImageBusiness(
  new ImageDatabase(),
  new TagsDatabase(),
  new IdGenerator(),
  new Authenticator()
);
export class ImageController {
  public createImage = async (req: Request, res: Response) => {
    try {
      const input: ImageInputDTO = {
        subtitle: req.body.subtitle,

        file: req.body.file,
        collection: req.body.collection,
      };

      const tag = req.body.tag;

      const token = req.headers.authorization as string;

      const result = await createImageBusiness.execute(input, tag, token);

      res.status(200).send("Image created successfully");
    } catch (err) {
      res.status(err.erroCode || 400).send({
        message: err.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };

  public getImages = async (req: Request, res: Response) => {
    try {
      const getImagesBusiness = new GetImagesBusiness(
        new ImageDatabase(),
        new Authenticator()
      );
      const token = req.headers.authorization as string;

      const result = await getImagesBusiness.execute(token);

      res.status(200).send({ result });
    } catch (err) {
      res.status(err.erroCode || 400).send({ message: err.message });
    }
  };

  public getImageById = async (req: Request, res: Response): Promise<void> => {
    try {
      const getImageByIdBusiness = new GetImageByIdBusiness(
        new ImageDatabase(),
        new Authenticator()
      );

      const id = req.params.id;
      const token = req.headers.authorization as string;

      const result = await getImageByIdBusiness.execute(id, token);

      res.status(200).send(result);
    } catch (err) {
      res.status(err.erroCode || 400).send({ message: err.message });
    }
    await BaseDatabase.destroyConnection();
  };
}
