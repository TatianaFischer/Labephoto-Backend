import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { User } from "../model/User";

export class SignupBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashManager: HashManager,
    private idGenerator: IdGenerator
  ) {}

  public async execute(input: SignupBusinessInput): Promise<string> {
    const hashPassword = await this.hashManager.hash(input.password);

    const id = this.idGenerator.generate();
    await this.userDatabase.createUser(
      new User(id, input.name, input.email, input.nickname, hashPassword)
    );

    return id;
  }
}

export interface SignupBusinessInput {
  name: string;
  email: string;
  password: string;
  nickname: string;
}
