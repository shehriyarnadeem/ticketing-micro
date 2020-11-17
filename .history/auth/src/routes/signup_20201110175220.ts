import express from 'express';
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
     

],(res,req) => {
  
    const { email, password } = res.body
})

export {router as signUpRouter }