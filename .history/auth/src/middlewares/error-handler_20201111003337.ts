import * as express from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log("Handle this error as a request validation error");
    const formattedErrors = err.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("Handle this error as a database connection errror");
    console.log(err.reason);
    return res.status(400).send({ errors: [{ message: err.reason }] });
  }
  res.status(400).send({
    message: "Something went wrong",
    error: err.message,
  });
};