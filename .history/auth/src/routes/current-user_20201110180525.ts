import express, {Request, Response} from 'express';

const router = express.Router();

router.get('/get/users/currentuser', (res, req) => {
 res.send('Hi there')
})

export {router as currentUserRouter }