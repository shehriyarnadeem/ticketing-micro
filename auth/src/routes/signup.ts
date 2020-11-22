import express from 'express'; // try to import this as import express from 'express'
require('express-async-errors');
import jwt from 'jsonwebtoken';
import { body } from 'express-validator'; // Express validator package
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
const router = express.Router();

router.post(
  '/api/users/signUp',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 8 })
      .withMessage('Password must be alteast 8 characters'),
  ],
  validateRequest,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {

    // const errors = validationResult(req);
    // if (errors.array().length > 0) {
    //   // If this was  is javascript land (not ts)
    //   // Ts would not allow error.reasons as reasons is not a Error property
    //   // const error  = new Error('Invalid email or pasword');
    //   // error.reasons  = errors.array();
    //   // throw error;

    //   // If using (ts) we made subclass of Error called RequestValidationError
    //   // For clearity purpose and assigned ValidationError property to error inside that class
    //   next(new RequestValidationError(errors.array()));
    // }
    const { email, password } = req.body;
    try {
      const checkExisting = await User.findOne({ email });
      if (checkExisting) {

        next(new BadRequestError('User already exists'));
      }

      const user = User.build({ email, password });
      await user.save();

      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY! // ! tells typescript that this environment variable is defined
      );

      req.session = {
        jwt: userJwt,
      };


      res.status(201).send(user);
    } catch (e) {
      console.log(e.message);
    }
  }

);

export { router as signUpRouter };
