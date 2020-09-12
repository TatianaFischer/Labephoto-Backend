import { BaseError } from "./base/BaseError";

export class InvalidInputError extends BaseError {
  constructor(message: string) {
    super(message, 422);
  }
}
