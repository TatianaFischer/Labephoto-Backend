"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const BaseError_1 = require("./base/BaseError");
class NotFoundError extends BaseError_1.BaseError {
    constructor(message) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
