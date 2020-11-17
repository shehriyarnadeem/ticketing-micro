import express, {Request, Response} from 'express';
import {body} from 'express-validator'
const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 8 })
    .withMessage('Password must be alteast 8 characters')
     

],(req: Request,res: Response) => {
  
    const { email, password } = res;
})

export {router as signUpRouter }