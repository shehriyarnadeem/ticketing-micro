import { ValidationError } from "express-validator";

export class RequestValidationError {
  constructor(public errors: ValidationError[]) {
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
