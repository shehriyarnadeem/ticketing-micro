import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  statusCode = 500;
  constructor(public message: string) {
    super();
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
