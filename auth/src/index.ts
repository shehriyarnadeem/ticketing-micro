import mongoose from 'mongoose';
import {app} from './app'
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
