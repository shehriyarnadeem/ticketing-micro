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

    if (errors.array.length > 0) {
      // If this was  is javascript land (not ts)
      // const error  = new Error('Invalid email or pasword');
      // error.reasons  = errors.array();
      // throw error;
      throw new Error("Invallid email or password");
    }
    const { email, password } = req.body;
    console.log("Creating a user ...");
    res.send({});
  }
);

export { router as signUpRouter };
