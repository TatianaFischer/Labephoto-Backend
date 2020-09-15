"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDatabase = void 0;
const BaseDatabase_1 = require("./base/BaseDatabase");
const User_1 = require("../model/User");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getConnection()
                .select("*")
                .from(this.tableNames.users)
                .where({ email });
            console.log(user[0]);
            return User_1.User.toUserModel(user[0]);
        });
    }
    // public async getUserByNickname(nickname: string): Promise<User | undefined> {
    //   const user = await this.getConnection()
    //     .select("*")
    //     .from(this.tableNames.users);
    //   return User.toUserModel(user[0]);
    // }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getConnection()
                .insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                nickname: user.getNickname(),
                password: user.getPassword(),
            })
                .into(this.tableNames.users);
        });
    }
}
exports.UserDatabase = UserDatabase;
