import express from 'express';
require('express-async-errors');
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signInRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { signUpRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';

const app = express();
app.set('truest proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

// Anything thrown from the above route handlers will be catched inside this errorHandler middleware
// We can also customize errorHandlers based on categories of Errors like seperate for DB and XHR
app.use(errorHandler);

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to Mongodb');
  } catch (e) {
    console.log(e.message);
  }

  app.listen(3000, () => {
    console.log('Listeing on port 3000!!');
  });
};

start();
