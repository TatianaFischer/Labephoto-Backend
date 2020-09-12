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
exports.SignupBusiness = void 0;
const User_1 = require("../model/User");
class SignupBusiness {
    constructor(userDatabase, cypher, idGenerator) {
        this.userDatabase = userDatabase;
        this.cypher = cypher;
        this.idGenerator = idGenerator;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield this.cypher.hash(input.password);
            const user = User_1.User.toUserModel(Object.assign(Object.assign({}, input), { id: this.idGenerator.generate(), password: hashPassword }));
            yield this.userDatabase.createUser(user);
            return user;
        });
    }
}
exports.SignupBusiness = SignupBusiness;
