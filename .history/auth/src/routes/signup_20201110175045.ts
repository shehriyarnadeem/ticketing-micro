import express from 'express';
import {body} from 'express-validator'
const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid')

],() => {
  
})

export {router as signUpRouter }