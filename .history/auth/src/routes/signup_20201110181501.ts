import * as express from 'express';
import {body, validationResult} from 'express-validator'
const router = express.Router();

router.post('/api/users/signUp', [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 8 })
    .withMessage('Password must be alteast 8 characters')
     

],(req: express.Request,res: express.Response) => {
    const errors = validationResult(req);
  
    if (errors.array.length>0) {
      return res.status(400).send(errors.array());
    }
    const { email, password } = req.body;
    console.log('Creating a user ...')
    res.send({});
})

export {router as signUpRouter }