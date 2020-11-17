import express from 'express';
import {body} from 'express-validator'
const router = express.Router();

router.post('/api/users/signup', [
  body('email')
    .isEmail()
     

],() => {
  
})

export {router as signUpRouter }