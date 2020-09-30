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
exports.GetImageByIdBusiness = void 0;
const InvalidInputError_1 = require("../error/InvalidInputError");
const SetupError_1 = require("../error/SetupError");
class GetImageByIdBusiness {
    constructor(imageDatabase, authenticator) {
        this.imageDatabase = imageDatabase;
        this.authenticator = authenticator;
    }
    execute(id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !token) {
                throw new SetupError_1.SetupError("Invalid");
            }
            const verifyToken = this.authenticator.verifyToken(token);
            if (!verifyToken) {
                throw new InvalidInputError_1.InvalidInputError("Invalid Token");
            }
            const image = yield this.imageDatabase.getImageById(id);
            return image;
        });
    }
}
exports.GetImageByIdBusiness = GetImageByIdBusiness;
