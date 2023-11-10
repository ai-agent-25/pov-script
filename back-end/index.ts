import express, { Express } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import { router } from "./routes/Api";

const port: number = 8080;
const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
