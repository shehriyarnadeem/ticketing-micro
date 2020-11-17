import { ValidationError } from "express-validator";

export class RequestValidationError {
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }
}
