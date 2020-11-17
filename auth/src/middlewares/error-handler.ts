import * as express from "express";
// import { RequestValidationError } from "../errors/request-validation-error";
// import { DatabaseConnectionError } from "../errors/database-connection-error";
import { CustomError } from "../errors/custom-error";
export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Before creating the customError  we had to check individually if each err is an
  // instance of the class it is being thrown by
  // if (err instanceof RequestValidationError) {
  //   console.log("Handle this error as a request validation error");

  //   //Before moving logic into RequestValidationError
  //   // const formattedErrors = err.errors.map((error) => {
  //   //   return { message: error.msg, field: error.param };
  //   // return res.status(400).send({ errors: formattedErrors });
  //   // });
  //   return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  // }

  if (err instanceof CustomError) {
    console.log("Handle this error as a request validation error");

    //Before moving logic into RequestValidationError
    // const formattedErrors = err.errors.map((error) => {
    //   return { message: error.msg, field: error.param };
    // return res.status(400).send({ errors: formattedErrors });
    // });
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  // Not required now since we have created the CustomError abstract class
  // if (err instanceof DatabaseConnectionError) {
  //   console.log("Handle this error as a database connection errror");

  //   return res.status(err.statusCode).send({ errors: err.serializeError() });
  // }
  // res.status(400).send({
  //   message: "Something went wrong",
  //   error: err.message,
  // });
};
