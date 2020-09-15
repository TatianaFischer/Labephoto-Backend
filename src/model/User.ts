export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private nickname: string,
    private password: string
  ) {}

  //
  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getEmail() {
    return this.email;
  }

  public getNickname() {
    return this.nickname;
  }

  public getPassword() {
    return this.password;
  }

  public static toUserModel(user: UserInputDTO): User {
    return new User(
      user.id,
      user.name,
      user.email,
      user.nickname,
      user.password
    );
  }
}

export interface UserInputDTO {
  id: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
}

// export interface LoginInputDTO {
//   email: string;
//   password: string;
// }
