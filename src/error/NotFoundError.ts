import { BaseError } from "./base/BaseError";

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super(message, 404);
  }
}
