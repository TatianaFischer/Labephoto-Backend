import { BaseDatabase } from "./base/BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  public async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.getConnection()
      .select("*")
      .from(this.tableNames.users);
    return User.toUserModel(user[0]);
  }

  public async createUser(user: User): Promise<void> {
    await this.getConnection().insert(user).into(this.tableNames.users);
  }
}
