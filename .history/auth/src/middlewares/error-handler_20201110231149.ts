import * as express from "express";

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("Something went wrong");

  res.status(400).send({
    message: "Something went wrong",
    error: err.message,
  });
};
