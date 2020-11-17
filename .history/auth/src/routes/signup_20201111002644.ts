import * as express from "express"; // try to import this as import express from 'express'
import { body, validationResult } from "express-validator"; // Express validator package
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
const router = express.Router();

router.post(
  "/api/users/signUp",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 8 })
      .withMessage("Password must be alteast 8 characters"),
  ],
  (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);
    console.log(errors.array().length);
    if (errors.array.length > 0) {
      // If this was  is javascript land (not ts)
      // Ts would not allow error.reasons as reasons is not a Error property
      // const error  = new Error('Invalid email or pasword');
      // error.reasons  = errors.array();
      // throw error;

      // If using (ts) we made subclass of Error called RequestValidationError
      // For clearity purpose and assigned ValidationError property to error inside that class
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    console.log("Creating a user ...");
    throw new DatabaseConnectionError();
  }
);

export { router as signUpRouter };
