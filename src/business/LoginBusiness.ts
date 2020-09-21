import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { User } from "../model/User";
import { NotFoundError } from "../error/NotFoundError";
import { Authenticator } from "../services/Authenticator";

export class LoginBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager
  ) {}

  public async execute(input: LoginBusinessInput): Promise<string> {
    if (!input) {
      throw new Error("Missing datas");
    }
    console.log("login"); ///////////
    const user = await this.userDatabase.getUserByEmailOrNick(input.email);
    console.log(user); //////////////

    const isPasswordRight = await this.hashManager.compare(
      input.password,
      user.getPassword() as string
    );

    if (!isPasswordRight) {
      throw new NotFoundError("Invalid credentials");
    }

    const id = user.getId();
    const token = new Authenticator().generateToken({ id });
    return token;
  }
}

export interface LoginBusinessInput {
  email: string;
  password: string;
}
