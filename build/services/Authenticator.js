"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authenticator = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const SetupError_1 = require("../error/SetupError");
class Authenticator {
    secretKey() {
        if (!process.env.JWT_SECRET_KEY) {
            throw new SetupError_1.SetupError("Missing authorization secret key. Did you remember to create .env file?");
        }
        return process.env.JWT_SECRET_KEY;
    }
    generateToken(dataInput) {
        return jwt.sign(dataInput, this.secretKey());
    }
    verifyToken(token) {
        const payload = jwt.verify(token, this.secretKey());
        const result = {
            id: payload.id,
        };
        return result;
    }
}
exports.Authenticator = Authenticator;
