import express, { Express } from "express";

const port: number = 8080;
const app: Express = express();

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
