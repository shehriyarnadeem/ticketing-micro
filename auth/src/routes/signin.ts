import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Password } from '../services/password';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
const router = express.Router();

router.post(
  '/api/users/signIn',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      next(new BadRequestError('Invalid credentioals'));
    }
    console.log(existingUser);

    // const passwordMatch = await Password.compare(
    //   existingUser.password,
    //   password
    // );
  }
);

export { router as signInRouter };
