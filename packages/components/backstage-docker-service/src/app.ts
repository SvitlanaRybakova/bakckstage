import express, { Express } from "express";
import bodyparser from "body-parser";

const app: Express = express();

app.use(bodyparser.json());
app.get('/', (req, res) => {
    res.send('Hello, world!');
  });

export default app;
