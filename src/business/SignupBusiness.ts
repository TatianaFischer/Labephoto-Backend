import { UserDatabase } from "../data/UserDatabase";
import { Cypher } from "../services/Cypher";

import { IdGenerator } from "../services/IdGenerator";
import { User } from "../model/User";

export class SignupBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private cypher: Cypher,
    private idGenerator: IdGenerator
  ) {}
  public async execute(input: SignupBusinessInput): Promise<User> {
    const hashPassword = await this.cypher.hash(input.password);
    const user = User.toUserModel({
      ...input,
      id: this.idGenerator.generate(),
      password: hashPassword,
    });
    await this.userDatabase.createUser(user!);
    return user!;
  }
}

export interface SignupBusinessInput {
  name: string;
  email: string;
  nickname: string;
  password: string;
}
