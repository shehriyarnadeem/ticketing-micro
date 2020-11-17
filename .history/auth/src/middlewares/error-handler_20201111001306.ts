import * as express from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Something went wrong");

  if (err instanceof RequestValidationError) {
    console.log(err);
    console.log("Handle this error as a request validation error");
  }

  if (err instanceof DatabaseConnectionError) {
    console.log("Handle this error as a database connection errror");
  }
  res.status(400).send({
    message: "Something went wrong",
    error: err.message,
  });
};