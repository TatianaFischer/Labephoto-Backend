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
exports.LoginBusiness = void 0;
const NotFoundError_1 = require("../error/NotFoundError");
const Authenticator_1 = require("../services/Authenticator");
class LoginBusiness {
    constructor(userDatabase, hashManager) {
        this.userDatabase = userDatabase;
        this.hashManager = hashManager;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!input) {
                throw new Error("Missing datas");
            }
            const user = yield this.userDatabase.getUserByEmailOrNick(input.emailOrNick);
            const isPasswordRight = yield this.hashManager.compare(input.password, user.getPassword());
            if (!isPasswordRight) {
                throw new NotFoundError_1.NotFoundError("Invalid credentials");
            }
            const id = user.getId();
            const token = new Authenticator_1.Authenticator().generateToken({ id });
            return token;
        });
    }
}
exports.LoginBusiness = LoginBusiness;
