import { Request, Response } from "express";
import { BaseDatabase } from "../data/base/BaseDatabase";
import { SignupBusiness } from "../business/SignupBusiness";
import { UserDatabase } from "../data/UserDatabase";

import { IdGenerator } from "../services/IdGenerator";
import { InvalidInputError } from "../error/InvalidInputError";
import { Authenticator } from "../services/Authenticator";
import { LoginBusiness } from "../business/LoginBusiness";

import { HashManager } from "../services/HashManager";
//

export class UserController {
  public signup = async (req: Request, res: Response) => {
    try {
      const signupBusiness = new SignupBusiness(
        new UserDatabase(),
        new HashManager(),
        new IdGenerator()
      );

      const input = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname,
      };

      if (!input.name || !input.email || !input.password || !input.nickname) {
        throw new InvalidInputError("Missing data");
      }

      if (input.password < 6) {
        throw new InvalidInputError(
          "Missing data: the password must be at least 6 characters"
        );
      }
      const user = await signupBusiness.execute(input);

      const authenticator = new Authenticator();

      const token = authenticator.generateToken({
        id: user,
      });

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

  public login = async (req: Request, res: Response) => {
    try {
      const loginBusiness = new LoginBusiness(
        new UserDatabase(),
        new HashManager()
      );
      const input = {
        email: req.body.email,
        password: req.body.password,
      };

      const userLogin = await loginBusiness.execute(input);

      if (!input.email || !input.password) {
        throw new InvalidInputError("Missing data");
      }

      res.status(200).send({ message: "Sucess!:", userLogin });
    } catch (err) {
      res.status(err.customErrorCode || 400).send({
        message: err.message,
      });
    } finally {
      await BaseDatabase.destroyConnection();
    }
  };
}
