import { BaseError } from "./base/BaseError";

export class SetupError extends BaseError {
  constructor(message: string = "Error on project setup") {
    super(message, 500);
  }
}
