import express, { Express } from "express";
import morgan from "morgan";

const port: number = 8080;
const app: Express = express();

app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
