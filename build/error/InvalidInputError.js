"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidInputError = void 0;
const BaseError_1 = require("./base/BaseError");
class InvalidInputError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 422);
    }
}
exports.InvalidInputError = InvalidInputError;
