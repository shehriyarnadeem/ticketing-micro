import * as express from 'express';
import { json } from 'body-parser';
import { currentUserRouter } from './routes/current-user'
const app = express();
app.use(json());
app.use(currentUserRouter);
app.listen(3000, () => {

  console.log("Listeing on port 3000!!!1!!!");
})