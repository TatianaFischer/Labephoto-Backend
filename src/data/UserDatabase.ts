import { BaseDatabase } from "./base/BaseDatabase";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  public async getUserByEmailOrNick(
    email?: string,
    nickname?: string
  ): Promise<User> {
    const user = await this.getConnection()
      .select("*")
      .from(this.tableNames.users)
      .where({ email });

    return User.toUserModel(user[0]);
  }

  public async createUser(user: User): Promise<void> {
    await this.getConnection()
      .insert({
        id: user.getId(),
        name: user.getName(),
        email: user.getEmail(),
        nickname: user.getNickname(),
        password: user.getPassword(),
      })
      .into(this.tableNames.users);
  }
}
