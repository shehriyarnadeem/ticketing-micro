import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
// # Option 1
// For restricting Error response structure in this class
// This interface if implemented on the class will define the class property
// types and neccesarry functions and responses from those functions inside the class

// interface CustomError {
//   statusCode: number;
//   serializeErrors(): {
//     message: string;
//     field?: string;
//   }[];
// }

// export class RequestValidationError extends Error implements  CustomError{

// # Option 2 = Create an abstract class called CustomError and define
// all the properties and functions to be implemented inside sub classes
// And extend sub classes from that abstract class

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
