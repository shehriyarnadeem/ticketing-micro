import * as express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";

const app = express();
app.use(json());
app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);

// Anything thrown from the above route handlers will be catched inside this errorHandler middleware
// We can also customize errorHandlers based on categories of Errors like seperate for DB and XHR
app.use(errorHandler);
app.listen(3000, () => {
  console.log("Listeing on port 3000!!!1!!!");
});
