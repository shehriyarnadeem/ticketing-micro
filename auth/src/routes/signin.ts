import express, { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { Password } from '../services/password';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import jwt from 'jsonwebtoken'
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


    const passwordMatch = await Password.compare(
      existingUser?.password!,
      password
    );

    if (!passwordMatch) {

      next(new BadRequestError('Invalid credentioals'));
    } else {

      const userJwt = jwt.sign(
        {
          id: existingUser?.id!,
          email: existingUser?.email!,
        },
        process.env.JWT_KEY! // ! tells typescript that this environment variable is defined
      );

      req.session = {
        jwt: userJwt,
      };
      console.log(res.get('Cookie'), '1232')
      res.status(200).send(existingUser);
    }
  }
);

export { router as signInRouter };
