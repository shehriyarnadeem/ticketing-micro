import * as express from 'express';
import { json } from 'body-parser';

const app = express();
app.use(json());
app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there');
})
app.listen(3000, () => {

  console.log("Listeing on port 3000!!!1!!!");
})