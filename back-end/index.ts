import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

const port: number = 8080;
const app: Express = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
