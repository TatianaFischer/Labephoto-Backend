"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupError = void 0;
const BaseError_1 = require("./base/BaseError");
class SetupError extends BaseError_1.BaseError {
    constructor(message = "Error on project setup") {
        super(message, 500);
    }
}
exports.SetupError = SetupError;
