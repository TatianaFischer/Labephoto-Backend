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
exports.UserController = void 0;
const BaseDatabase_1 = require("../data/base/BaseDatabase");
const SignupBusiness_1 = require("../business/SignupBusiness");
const UserDatabase_1 = require("../data/UserDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const InvalidInputError_1 = require("../error/InvalidInputError");
const Authenticator_1 = require("../services/Authenticator");
const LoginBusiness_1 = require("../business/LoginBusiness");
const HashManager_1 = require("../services/HashManager");
//
class UserController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const signupBusiness = new SignupBusiness_1.SignupBusiness(new UserDatabase_1.UserDatabase(), new HashManager_1.HashManager(), new IdGenerator_1.IdGenerator());
                const input = {
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    nickname: req.body.nickname,
                };
                if (!input.name || !input.email || !input.password || !input.nickname) {
                    throw new InvalidInputError_1.InvalidInputError("Missing data");
                }
                if (input.password < 6) {
                    throw new InvalidInputError_1.InvalidInputError("Missing data: the password must be at least 6 characters");
                }
                const user = yield signupBusiness.execute(input);
                const authenticator = new Authenticator_1.Authenticator();
                const token = authenticator.generateToken({
                    id: user,
                });
                res.status(200).send({ token });
                return token;
            }
            catch (err) {
                res.status(err.customErrorCode || 400).send({
                    message: err.message,
                });
            }
            finally {
                yield BaseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginBusiness = new LoginBusiness_1.LoginBusiness(new UserDatabase_1.UserDatabase(), new HashManager_1.HashManager());
                const input = {
                    emailOrNick: req.body.emailOrNick,
                    password: req.body.password,
                };
                const token = yield loginBusiness.execute(input);
                if (!input.emailOrNick || !input.password) {
                    throw new InvalidInputError_1.InvalidInputError("Missing data");
                }
                res.status(200).send({ message: "Sucess!:", token });
            }
            catch (err) {
                res.status(err.customErrorCode || 400).send({
                    message: err.message,
                });
            }
            finally {
                yield BaseDatabase_1.BaseDatabase.destroyConnection();
            }
        });
    }
}
exports.UserController = UserController;
